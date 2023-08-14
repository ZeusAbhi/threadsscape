import Medusa from "@medusajs/medusa-js"

const medusaClient = new Medusa({ baseUrl:process.env.NEXT_PUBLIC_MEDUSA_BASE })

export { medusaClient }