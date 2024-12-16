import React, { useEffect, useState } from "react";
import { Text, TextStyle, Vibration } from "react-native";

interface Props {
  style?: TextStyle;
  phrases?: string[];
  typingDelay?: number;
  pauseDelay?: number;
  onComplete?: () => void;
}

export default function TypewriterText({
  style,
  phrases = ["Hello", "Welcome", "Type with me"],
  typingDelay = 80,
  pauseDelay = 400,
  onComplete,
}: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(waitTimer);
    }

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => {
          const nextIndex = (prev + 1) % phrases.length;
          return nextIndex;
        });
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayedText((text) => text.slice(0, -1));
      }, typingDelay / 2);
      return () => clearTimeout(deleteTimer);
    }

    if (displayedText === currentPhrase) {
      setIsWaiting(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      Vibration.vibrate(1); // Short vibration for typing effect
    }, typingDelay);

    return () => clearTimeout(typeTimer);
  }, [
    displayedText,
    currentPhraseIndex,
    isDeleting,
    isWaiting,
    phrases,
    typingDelay,
    pauseDelay,
  ]);

  useEffect(() => {
    if (isDeleting && displayedText === "") {
      onComplete?.();
    }
  }, [isDeleting, displayedText, onComplete]);

  return <Text style={style}>{displayedText}</Text>;
}
