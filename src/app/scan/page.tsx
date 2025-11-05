'use client';

import { analyzeProduct, type AnalyzeProductOutput } from '@/ai/flows/analyze-product-ingredients';
import { processVoiceCommand } from '@/ai/flows/process-voice-commands';
import { AnalysisResultCard } from '@/components/analysis-result-card';
import { RecommendationCard } from '@/components/recommendation-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/use-user-profile';
import { mockProducts } from '@/lib/mock-data';
import type { MockProduct } from '@/lib/types';
import { Barcode, Mic, Upload, AlertTriangle, FileWarning, Info, Video, CameraOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


type ScanState = 'idle' | 'loading' | 'result' | 'error';

export default function ScanPage() {
  const { profile, isLoaded: profileLoaded } = useUserProfile();
  const { toast } = useToast();
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [product, setProduct] = useState<MockProduct | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeProductOutput | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);


  const handleScan = async () => {
    if (!profile.name || !profile.medicalConditions) {
      toast({
        title: 'Profile Incomplete',
        description: 'Please complete your health profile first for an accurate analysis.',
        variant: 'destructive',
        action: <Button asChild variant="secondary"><Link href="/profile">Go to Profile</Link></Button>
      });
      return;
    }

    setScanState('loading');
    setAnalysis(null);

    // Stop camera stream when loading/analyzing
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setProduct(randomProduct);

    try {
      const result = await analyzeProduct({
        healthProfile: {
          name: profile.name,
          age: Number(profile.age) || 25,
          gender: profile.gender || 'other',
          medicalConditions: profile.medicalConditions.split(/,|\n/).map(s => s.trim()).filter(Boolean),
        },
        productDetails: randomProduct.details,
      });
      setAnalysis(result);
      setScanState('result');
    } catch (error) {
      console.error('AI analysis failed', error);
      setScanState('error');
      toast({
        title: 'Analysis Failed',
        description: 'The AI analysis could not be completed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleVoiceCommand = async () => {
    if (scanState !== 'result' || !product) {
       toast({ title: 'No product scanned', description: 'Please scan a product before using voice commands.' });
       return;
    }
    toast({ title: 'Listening...', description: 'Processing command: "Is this safe for me?"' });
    try {
        const result = await processVoiceCommand({
            voiceCommand: 'Is this product safe for me and what are some alternatives?',
            healthProfile: `Name: ${profile.name}, Age: ${profile.age}, Conditions: ${profile.medicalConditions}`,
            productDetails: `${product.name}: ${JSON.stringify(product.details)}`
        });
        toast({
            title: 'AI Assistant Says:',
            description: result.response,
            duration: 9000,
        });
    } catch(e) {
        toast({
            title: 'Voice command failed',
            variant: 'destructive'
        });
    }
  }

  const renderIdleContent = () => (
     <div className="text-center space-y-6 flex flex-col items-center">
        <Card className="w-full max-w-lg aspect-video overflow-hidden shadow-lg relative">
            <CardContent className="p-0">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                        <CameraOff className="h-16 w-16 mb-4" />
                        <h2 className="text-xl font-bold">Camera Access Denied</h2>
                        <p className="text-sm text-center">Please enable camera permissions in your browser settings to scan products.</p>
                    </div>
                )}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                       <Skeleton className="w-full h-full" />
                    </div>
                )}
            </CardContent>
        </Card>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Ready to Scan?</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {profileLoaded && !profile.name ? (
            <span className="text-amber-600 flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5"/> Please create a profile to get started.
            </span>
           ) : "Position a product's barcode in front of the camera and click Scan."
          }
        </p>
        <div className="flex gap-4 justify-center">
           <Button size="lg" onClick={handleScan} disabled={!profileLoaded || !profile.name || !hasCameraPermission}>
            <Barcode className="mr-2 h-5 w-5" /> Scan a Product
          </Button>
          <Button size="lg" variant="outline" disabled={true}>
            <Upload className="mr-2 h-5 w-5" /> Upload Image
          </Button>
        </div>
         {!profile.name && profileLoaded && 
            <Button asChild variant="default"><Link href="/profile">Create Profile</Link></Button>
         }
         {profile.name && profileLoaded && 
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Info className="h-3 w-3"/>Using profile for {profile.name}.</p>
         }
      </div>
  )


  const renderContent = () => {
    switch (scanState) {
      case 'loading':
        return (
          <div className="w-full max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <Skeleton className="h-40 w-40 rounded-lg mx-auto" />
                <div className="md:col-span-2 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        );
      case 'result':
        return (
          product && analysis && (
            <div className="w-full max-w-4xl mx-auto animate-in fade-in-50 duration-500 space-y-8">
              <Card className="shadow-md overflow-hidden">
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                   <Image src={product.imageUrl} alt={product.name} width={160} height={160} className="rounded-lg mx-auto shadow-sm" data-ai-hint={product.imageHint}/>
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold font-headline">{product.name}</h2>
                     <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        <span>Calories: {product.details.calories}kcal</span>
                        <span>Sugar: {product.details.sugar}g</span>
                        <span>Sodium: {product.details.sodium}mg</span>
                        <span>Fat: {product.details.fat}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AnalysisResultCard status={analysis.status} explanation={analysis.explanation} />
              
              <div className="flex items-center justify-center gap-4">
                 <Button onClick={() => window.location.reload()}>
                    <Video className="mr-2 h-4 w-4" /> Scan Another
                </Button>
                <Button variant="outline" onClick={handleVoiceCommand}>
                    <Mic className="mr-2 h-4 w-4" /> Ask AI Assistant
                </Button>
              </div>

              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <RecommendationCard recommendations={analysis.recommendations} />
              )}
            </div>
          )
        );
      case 'error':
        return <div className="text-center text-red-500"><FileWarning className="mx-auto h-12 w-12"/>An error occurred. Please try scanning again.</div>
      default:
        return renderIdleContent();
    }
  };

  return <div className="container py-12 px-4 md:px-6 flex flex-col items-center justify-center flex-grow">{renderContent()}</div>;
}
