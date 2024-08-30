"use client";

import { Locale } from "@/dictionaries";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SubscribeForm = ({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: Locale;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submiting, setSubmiting] = useState(false);

  const [errorInputs, setErrorInputs] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const validName = inputValidator(name, "name");
    const validEmail = inputValidator(email, "email");
    setErrorInputs({ name: "", email: "" });
    if (validEmail && validName) {
      setSubmiting(true);
      try {
        const result = await fetch("/api/new-sub", {
          cache: "no-store",
          method: "POST",
          body: JSON.stringify({
            lang: lang,
            name: name,
            email: email,
          }),
        });
        if ([200, 201].includes(result.status)) {
          setName("");
          setEmail("");
          toast(dictionary?.form_success, { type: "success", autoClose: 3000 });
        } else {
          toast(dictionary?.form_error, { type: "error", autoClose: 3000 });
        }
      } catch (error) {
        toast(dictionary?.form_error, { type: "error", autoClose: 3000 });
      } finally {
        setSubmiting(false);
      }
    }
  };

  const handleInputBlur = (value: string, scheme: "email" | "name") => {
    setErrorInputs((state) => ({ ...state, [scheme]: "" }));
    const isValid = inputValidator(value, scheme);
    switch (scheme) {
      case "name":
        isValid && setName(value);
        !isValid &&
          setErrorInputs((state) => ({
            ...state,
            [scheme]: dictionary?.form_invalid_name,
          }));
        break;
      case "email":
        isValid && setEmail(value);
        !isValid &&
          setErrorInputs((state) => ({
            ...state,
            [scheme]: dictionary?.form_invalid_email,
          }));
        break;

      default:
        break;
    }
  };

  const inputValidator = (value: string, scheme: "email" | "name") => {
    let isValid = true;
    switch (scheme) {
      case "name":
        isValid = value?.trim().length > 0 && /^[a-zA-Z ]+$/.test(value);
        break;
      case "email":
        isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        break;

      default:
        break;
    }
    return isValid;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg bg-white px-4 py-10 text-ab-black
                items-start md:w-full sm:w-full xs:w-full"
        action=""
        method="post"
      >
        <label className="font-semibold">{dictionary?.form_name}</label>
        <input
          className="w-full py-3 px-6 border border-ab-gray rounded-lg"
          type="text"
          name="mce-FNAME"
          placeholder={dictionary?.form_placeholder_name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleInputBlur(name, "name")}
        />
        {errorInputs.name && (
          <span className="text-red-500 text-sm">{errorInputs.name}</span>
        )}
        <label className="font-semibold">{dictionary?.form_email}</label>
        <input
          className="w-full py-3 px-6 border border-ab-gray rounded-lg"
          type="email"
          name="mce-EMAIL"
          placeholder={dictionary?.form_placeholder_email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleInputBlur(email, "email")}
        />
        {errorInputs.email && (
          <span className="text-red-500 text-sm">{errorInputs.email}</span>
        )}
        <button
          className="self-center rounded-lg bg-ab-primary px-9 py-2 text-white hover:opacity-50 mt-10
                    disabled:opacity-50"
          type="submit"
          disabled={
            errorInputs.name.length > 0 ||
            errorInputs.email.length > 0 ||
            name.length === 0 ||
            email.length === 0 ||
            submiting
          }
        >
          {submiting ? (
            <ArrowPathIcon
              className="text-white animate-[spin_1.5s_linear_infinite]"
              width={20}
              height={20}
            />
          ) : (
            dictionary?.form_submit
          )}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
