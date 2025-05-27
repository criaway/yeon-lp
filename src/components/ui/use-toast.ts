import { useToast, toast } from "@/hooks/use-toast";

// Enhanced toast for more engaging notifications
const enhancedToast = {
  success: (message: string, title?: string) => {
    return toast({
      title: title || "Success! 🎵",
      description: message,
      variant: "default",
    });
  },

  error: (message: string, title?: string) => {
    return toast({
      title: title || "Oops! 🎸",
      description: message,
      variant: "destructive",
    });
  },

  info: (message: string, title?: string) => {
    return toast({
      title: title || "Listen up! 🎧",
      description: message,
      variant: "default",
    });
  },
};

export { useToast, enhancedToast as toast };
