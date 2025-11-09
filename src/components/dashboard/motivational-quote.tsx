"use client";

import { generateMotivationalQuote } from "@/ai/flows/generate-motivational-quote";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function MotivationalQuote() {
  const { profile, isLoaded } = useUserProfile();
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && profile.medicalConditions) {
      setIsLoading(true);
      generateMotivationalQuote({ healthConditions: profile.medicalConditions })
        .then((response) => {
          setQuote(response.quote);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else if (isLoaded) {
      // No conditions, set a generic quote or leave blank
       setQuote("A healthy outside starts from the inside.");
       setIsLoading(false);
    }
  }, [isLoaded, profile.medicalConditions]);
  
  return (
    <Card className="bg-accent/50 border-accent shadow-md h-full flex flex-col">
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary"/>
                Daily Motivation
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
            {isLoading ? (
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ) : (
                <p className="text-center text-lg font-medium text-accent-foreground">
                    &ldquo;{quote}&rdquo;
                </p>
            )}
        </CardContent>
    </Card>
  )
}
