"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// data used for filtering
const chipData = {
  data: [
    "React",
    "Hands On",
    "Live Coding",
    "Angular",
    "Vue JS",
    "JS Fundamentals",
    "Typescript",
    "Browser/DOM",
    "API",
    "Router",
    "Forms",
    "Jest",
    "Vue",
    "Templates",
    "Directives",
    "Routing",
    "State management",
    "Asynchronous programming",
    "React Js",
    "Hooks",
    "JSX",
    "CSS",
    "flex",
    "DOM",
  ],
};

const ChipAutoComplete = () => {
  // defining all the required states
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(chipData.data);
  const inputRef = useRef(null);

  // handles the change in suggestion array whenever a change happens in input value
  // checks if there a word that starts with the input value and not present in the chips array
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSuggestions(
      chipData.data.filter(
        (item) =>
          item.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
          !chips.includes(item),
      ),
    );
  };

  // This functions handles the enter and backspace changes
  // on Clicking Enter the first word in the suggestion array is added to chip array
  // on Clicking backspace, the last word is removed from the chip array
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      if (!chips.includes(firstSuggestion)) {
        setChips([...chips, firstSuggestion]);
        setInputValue("");
        inputRef.current.focus();
        setSuggestions(chipData.data.filter((item) => !chips.includes(item)));
      }
    } else if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      setChips(chips.slice(0, -1));
    }
  };

  // For removal of words deleted by the user
  const removeChip = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    setSuggestions([...suggestions, chip]);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* div for chips and search input */}
      <div
        className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-400 px-3 py-2"
        onClick={() => inputRef.current.focus()}
      >
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-md bg-gray-200 px-2 py-1"
          >
            {chip}
            <span
              className="ml-2 cursor-pointer"
              onClick={() => removeChip(chip)}
            >
              &times;
            </span>
          </div>
        ))}
        <input
          ref={inputRef}
          className="flex-grow border-none px-2 py-1 focus:outline-none"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
        />
      </div>
      {/* List of suggestions */}
      {inputValue && suggestions.length > 0 && (
        <ul className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-gray-400 bg-white">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setChips([...chips, suggestion]);
                setInputValue("");
                setSuggestions(
                  chipData.data.filter((item) => !chips.includes(item)),
                );
                inputRef.current.focus();
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipAutoComplete;
