"use client"

import type React from "react"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared"
import { AuthService } from "@/services/AuthService"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(64)
});

const SignUpSchema = SignInSchema.merge(z.object({ 
  name: z.string().min(2).max(64) 
}));

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState<string>("signin")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { replace } = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
/*
    const { error, data } = SignInSchema.safeParse({ email, password });

    if (error) {
      console.log(error);
      return toast("Validation Error");
    }

    const { ok, res } = await AuthService.signIn({...data});
    
    if (!ok) {
      return toast("Something went wrong! Try again later");
    }*/

    toast("You signed");
    replace("/");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()

    /*const { error, data } = SignUpSchema.safeParse({ name, email, password });

    if (error) {
      console.log(error);
      return toast("Validation Error");
    }

    const { ok, res } = await AuthService.signUp({...data});
    
    if (!ok) {
      return toast("Something went wrong! Try again later");
    }
  */
    toast("You're in the system");
    replace("/");
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input 
                    id="signin-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-6">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input id="signup-name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-6">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}