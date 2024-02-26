"use client";
import React from "react";
import ExhibitionForm from "@/components/exhibition/ExhibitionForm";
import { useSelector } from "react-redux";

const editorEmails = [
  "sushantaneupane123",
  "hacktech902",
  "ranjitkunwar22",
  "thapasebak059",
];

const ExhibitionEditor = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const email = editorEmails.find(
    (email) => email + "@gmail.com" === user?.user?.email,
  );

  return (
    <div className="flex items-center flex-col">
      {email ? <ExhibitionForm /> : <>Oops you are on wrong page !!!</>}
    </div>
  );
};

export default ExhibitionEditor;
