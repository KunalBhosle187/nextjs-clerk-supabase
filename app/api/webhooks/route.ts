import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Missing SIGNING_SECRET environment variable");
    return new Response("Error: Missing webhook signing secret", {
      status: 500,
    });
  }

  // Create new Svix instance with secret and handle potential base64 errors
  let wh: Webhook;
  try {
    console.log("SIGNING_SECRET:", SIGNING_SECRET);
    wh = new Webhook(SIGNING_SECRET.trim());
  } catch (err) {
    console.error("Error: Invalid webhook signing secret format:", err);
    return new Response("Error: Invalid webhook signing secret", {
      status: 500,
    });
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Process the webhook event based on type
  const eventType = evt.type;
  const { id, ...attributes } = evt.data;

  try {
    switch (eventType) {
      case "user.created":
        await prisma.user.create({
          data: {
            clerkId: id,
            email: attributes.email_addresses?.[0]?.email_address || "",
          },
        });
        break;

      case "user.updated":
        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: attributes.email_addresses?.[0]?.email_address || undefined,
          },
        });
        break;

      case "user.deleted":
        await prisma.user.delete({
          where: { clerkId: id },
        });
        break;

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    console.log(`Successfully processed ${eventType} webhook for user ${id}`);
    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error(`Error processing ${eventType} webhook:`, error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
