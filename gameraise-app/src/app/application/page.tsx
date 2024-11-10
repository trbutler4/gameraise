"use client"

import { useRouter } from "next/navigation"
import { useWallets } from "@/providers/wallet-provider"
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
import { Label } from "@/components/ui/label"

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
  background_image: z.instanceof(File).optional(),
  profile_image: z.instanceof(File).optional(),
})

export default function ApplicationPage() {
  return (
    <div className="flex items-center justify-center">
      <ApplicationForm />
    </div>
  )
}

function ApplicationForm() {
  const router = useRouter()
  const { state } = useWallets()
  const { selectedWallet, selectedAccount } = state

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
      backer_perks: [],
      background_image: undefined,
      profile_image: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })

    let background_image_url = null
    let profile_image_url = null

    // Upload background image if it exists
    if (values.background_image) {
      const { data: backgroundData, error: backgroundError } =
        await supabase.storage
          .from("game-images")
          .upload(
            `background/${Date.now()}-${values.background_image.name}`,
            values.background_image
          )

      if (backgroundError) throw backgroundError
      background_image_url = backgroundData?.path
    }

    if (values.profile_image) {
      const { data: profileData, error: profileError } = await supabase.storage
        .from("game-images")
        .upload(
          `profile/${Date.now()}-${values.profile_image.name}`,
          values.profile_image
        )

      if (profileError) throw profileError
      profile_image_url = profileData?.path
    }

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
      background_image,
      profile_image,
    } = values

    const { data, error } = await supabase
      .from("game")
      .insert({
        title,
        description,
        author_name: author,
        author_address: selectedAccount?.address,
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
        bg_image_url: background_image,
        pfp_image_url: profile_image,
      })
      .select()

    if (error) {
      console.error(error)
    } else {
      console.log("inserted game into db with id:", data[0].id)
      router.push(`/game/${data[0].id}`)
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
        <FormField
          control={form.control}
          name="background_image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="text-white">
              <FormLabel>Background Image</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="background-image">Upload</Label>
                  <Input
                    id="background-image"
                    type="file"
                    accept="image/*"
                    {...field}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      onChange(file)
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Upload a background image for your game page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile_image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="text-white">
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="profile-image">Upload</Label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    {...field}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      onChange(file)
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Upload a profile image for your game.
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
