import * as mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";
import * as md5 from "md5";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function POST(req: Request) {
  try {
    const { lang, email, name } = await req.json();

    if (!["jp", "es", "en"].includes(lang)) {
      throw Error("Invalid lang");
    }

    const emailFront = email;
    const subscriberHash = md5.default(emailFront);

    if (!process.env.MAILCHIMP_LIST_ID) {
      throw new Error("Error server configuration");
    }

    const listId = process.env.MAILCHIMP_LIST_ID;

    let existEmail;
    try {
      const checkRequest = await mailchimp.lists.getListMember(
        listId,
        subscriberHash
      );

      existEmail = !!checkRequest;
    } catch (error) {
      existEmail = false;
    }

    if (!existEmail) {
      await mailchimp.lists.addListMember(
        listId,
        {
          email_address: emailFront,
          status: "subscribed",
          language: lang,
          tags: ["Subscripciones"],
          merge_fields: {
            FNAME: name,
          },
        },
        { skipMergeValidation: true }
      );
    } else {
      await mailchimp.lists.setListMember(
        listId,
        subscriberHash,
        {
          email_address: emailFront,
          status_if_new: "subscribed",
          language: lang,
          merge_fields: {
            FNAME: name,
          },
        },
        { skipMergeValidation: true }
      );
    }

    return NextResponse.json(existEmail, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
