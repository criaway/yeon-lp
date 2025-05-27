import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CTASection: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!isValidEmail(email)) {
      toast({
        title: t("invalidEmailTitle"),
        description: t("invalidEmailDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert email into the Supabase table
      const { error } = await supabase
        .from("Emails-Newsletter-Calc")
        .insert([{ Email: email }]);

      if (error) {
        console.error("Error saving email:", error);

        // Check if it's a duplicate email error
        if (error.code === "23505") {
          toast({
            title: t("emailExistsTitle"),
            description: t("emailExistsDesc"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("errorTitle"),
            description: t("errorDesc"),
            variant: "destructive",
          });
        }
      } else {
        // Success - show success message and clear input
        toast({
          title: t("successTitle"),
          description: t("successDesc"),
        });
        setEmail("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: t("errorTitle"),
        description: t("errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-8 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 border border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-3">{t("ctaTitle")}</h3>
        <p className="text-muted-foreground mb-6">{t("ctaNewDescription")}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="seu@email.com"
            className="max-w-xs"
            disabled={isLoading}
            required
          />
          <Button
            type="submit"
            className="bg-yeon-orange hover:bg-yeon-dark-orange text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("loadingButton")}
              </span>
            ) : (
              t("ctaButton")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CTASection;
