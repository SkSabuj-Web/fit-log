
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    const alreadyExists = plan.some((item) => item.id === workout.id);

    if (alreadyExists) {
      return {
        success: false,
        message: "Already added to today's plan.",
      };
    }

    if (plan.length >= 5) {
      return {
        success: false,
        message: "You can add maximum 5 workouts.",
      };
    }

    setPlan((prev) => [...prev, workout]);

    return {
      success: true,
      message: "Added to today's plan.",
    };
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const saveForLater = (workout) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      return {
        success: false,
        message: "Already saved.",
      };
    }

    setSaved((prev) => [...prev, workout]);

    return {
      success: true,
      message: "Saved for later.",
    };
  };

  const removeSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}

