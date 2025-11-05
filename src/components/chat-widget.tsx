'use client';

import { Bot } from "lucide-react";
import { ChatPanel } from "./chat-panel";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export default function ChatWidget() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Popover>
                <PopoverTrigger asChild>
                    <Button size="icon" className="rounded-full w-14 h-14 shadow-lg animate-bounce">
                        <Bot className="h-7 w-7" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent side="top" align="end" className="w-[80vw] max-w-md h-[60vh] p-0 rounded-xl overflow-hidden">
                    <Card className="h-full flex flex-col border-0 shadow-none">
                        <CardHeader className="py-3">
                           <CardTitle className="text-lg font-headline flex items-center gap-2"><Bot className="h-5 w-5"/> Health Assistant</CardTitle> 
                        </CardHeader>
                        <Separator />
                        <CardContent className="p-0 flex-1">
                            <ChatPanel />
                        </CardContent>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    )
}
