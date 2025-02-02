import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <form className="space-y-4">
            <div>
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="My E-commerce Store" />
            </div>
            <div>
              <Label htmlFor="store-email">Store Email</Label>
              <Input id="store-email" type="email" defaultValue="contact@mystore.com" />
            </div>
            <div>
              <Label htmlFor="store-currency">Currency</Label>
              <Input id="store-currency" defaultValue="USD" />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </TabsContent>
        <TabsContent value="payment">
          <form className="space-y-4">
            <div>
              <Label htmlFor="stripe-key">Stripe API Key</Label>
              <Input id="stripe-key" type="password" />
            </div>
            <div>
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input id="paypal-email" type="email" />
            </div>
            <Button type="submit">Save Payment Settings</Button>
          </form>
        </TabsContent>
        <TabsContent value="shipping">
          <form className="space-y-4">
            <div>
              <Label htmlFor="shipping-zones">Shipping Zones</Label>
              <Input id="shipping-zones" />
            </div>
            <div>
              <Label htmlFor="shipping-methods">Shipping Methods</Label>
              <Input id="shipping-methods" />
            </div>
            <Button type="submit">Save Shipping Settings</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

