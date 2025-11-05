'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUserProfile } from '@/hooks/use-user-profile';
import { Edit, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  age: z.coerce.number().positive().min(1).max(120),
  gender: z.enum(['male', 'female', 'other', '']),
  medicalConditions: z
    .string()
    .min(3, { message: 'Please list any relevant medical conditions or allergies.' })
    .describe('e.g., Diabetes, Hypertension, Peanut Allergy'),
});

export default function ProfilePage() {
  const { profile, saveProfile, isLoaded } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profile,
  });
  
  useEffect(() => {
    if(isLoaded) {
      form.reset(profile);
      // If profile is new, start in edit mode
      if (!profile.name) {
        setIsEditing(true);
      }
    }
  }, [profile, isLoaded, form]);


  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    saveProfile(data);
    setIsEditing(false);
  }

  if (!isLoaded) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }


  return (
    <div className="container py-8 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        {!isEditing ? (
          <>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center justify-between">
                <span>{profile.name || 'Your Health Profile'}</span>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit className="h-5 w-5" />
                </Button>
              </CardTitle>
              <CardDescription>
                This information helps us provide personalized health recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-lg font-semibold">{profile.age || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="text-lg font-semibold capitalize">{profile.gender || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Conditions & Allergies</p>
                <p className="text-lg font-semibold whitespace-pre-wrap">{profile.medicalConditions || 'None listed'}</p>
              </div>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">Your data is saved securely on your device.</p>
             </CardFooter>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{profile.name ? "Edit" : "Create"} Your Health Profile</CardTitle>
                <CardDescription>
                  This information helps us provide personalized health recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions & Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Diabetes, Hypertension, Peanut Allergy"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please list one item per line or separate by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                {profile.name && <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>}
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}
