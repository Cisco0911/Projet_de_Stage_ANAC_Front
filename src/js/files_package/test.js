
import React from "react";
import { test } from "./../main";

export default function Test() {

    return React.createElement(
        "div",
        null,
        "test = ",
        test,
        " "
    );
}