"use client"

import { supabase } from "@/utils/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(25).max(140),
  author: z.string().min(1).max(50),
  amount: z.number(),
  duration: z.number(),
  github_url: z.string(),
  twitter_url: z.string(),
  discord_url: z.string(),
  website_url: z.string(),
  platform: z.string(),
})

export default function ApplicationPage() {
  return (
    <div className="flex items-center justify-center">
      <ApplicationForm />
    </div>
  )
}

function ApplicationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      amount: 0,
      duration: 0,
      github_url: "",
      twitter_url: "",
      discord_url: "",
      website_url: "",
      platform: "", // Add any default platform value if needed
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const {
      title,
      description,
      author,
      amount,
      duration,
      github_url,
      twitter_url,
      discord_url,
      website_url,
      platform,
    } = values

    const { error } = await supabase.from("game").insert({
      title,
      description,
      author_name: author,
      author_address: "0x123", // TODO
      total_amount_usd: amount,
      current_amount_usd: 0,
      duration_days: duration,
      is_proposed: true,
      is_streaming: false,
      is_live: false,
      social_github_url: github_url,
      social_twitter_url: twitter_url,
      social_discord_url: discord_url,
      platform,
      website_url,
    })

    if (error) {
      console.error(error)
    } else {
      console.log("inserted game into db")
    }
  }

  return (
    <Form {...form} className="text-white">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Game Title</FormLabel>
              <FormControl>
                <Input placeholder="Tetris" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Game Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Drop the blocks to clear the map"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Everything a backer needs to know about your game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Game Studio/Author</FormLabel>
              <FormControl>
                <Input placeholder="Ubisoft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_url"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Github Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter_url"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Twitter Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discord_url"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Discord Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Website Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Funding Amount (USDC)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Total amount of funding desired.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel>Funding Duration (days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="90"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Total duration over which funds will be streamed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="outline"
            className="bg-black text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
