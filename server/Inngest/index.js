import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "movie-ticket-counter" });

const syncUserCreated = inngest.createFunction(
  { id: "sync/user-created" },
  { event: "clerk.user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };

    await User.create(userData);
  },
);

const syncUserDeletion = inngest.createFunction(
  { id: "sync/user-deletion" },
  { event: "clerk.user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
  },
);

const syncUserUpdation = inngest.createFunction(
  { id: "sync/user-updation" },
  { event: "clerk.user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData);
  },
);

export const functions = [syncUserCreated, syncUserDeletion, syncUserUpdation];
