"use client";
import Accordion from "@/components/widgets/Accordion";
import { useState } from "react";

export default function Question({ item }) {
  return <Accordion item={item} />;
}
