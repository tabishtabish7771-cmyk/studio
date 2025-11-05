import { ChatPanel } from "@/components/chat-panel";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="container py-8 px-4 md:px-6 h-[calc(100vh-56px)] flex flex-col">
        <h1 className="text-3xl font-bold font-headline mb-4">AI Health Assistant</h1>
        <p className="text-muted-foreground mb-6">Ask me anything about nutrition, ingredients, or healthy alternatives. <br/> For example: "What's a good alternative to milk for someone who is lactose intolerant?"</p>
        <Card className="flex-1 flex flex-col shadow-lg">
            <CardContent className="p-0 flex-1 flex flex-col">
                <ChatPanel />
            </CardContent>
        </Card>
    </div>
  );
}
