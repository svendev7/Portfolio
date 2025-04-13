import { useLanguage } from "@/lib/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <div className="relative flex h-8 w-16 overflow-hidden rounded-md border border-border/50 bg-background/50 backdrop-blur-sm">
              <div 
                className={`absolute top-0 h-full w-1/2 bg-purple-500/20 transition-all duration-300 ${
                  language === 'en' ? 'left-0' : 'left-1/2'
                }`}
              />
              <button
                onClick={() => setLanguage('en')}
                className={`flex h-full w-1/2 items-center justify-center transition-colors ${
                  language === 'en' ? 'text-foreground' : 'text-foreground/50'
                }`}
              >
                <div className="w-4 h-3 relative">
                  <Image 
                    src="/flags/gb.svg" 
                    alt="English" 
                    width={16} 
                    height={12} 
                    className="rounded-sm"
                  />
                </div>
              </button>
              <button
                onClick={() => setLanguage('nl')}
                className={`flex h-full w-1/2 items-center justify-center transition-colors ${
                  language === 'nl' ? 'text-foreground' : 'text-foreground/50'
                }`}
              >
                <div className="w-4 h-3 relative">
                  <Image 
                    src="/flags/nl.svg" 
                    alt="Dutch" 
                    width={16} 
                    height={12} 
                    className="rounded-sm"
                  />
                </div>
              </button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Current language: {language === 'en' ? 'English' : 'Dutch'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 