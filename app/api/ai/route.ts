import ApiResponse from "@/lib/apiResponse";
import Together from "together-ai";
const together = new Together({
    apiKey : "tgp_v1_NInRdpTditfzKvJrK-LDVYwYGjFEri4QEF7PFqMMREI",
    baseURL :"https://api.together.xyz/v1"

});

// Together ai = cb05e32c329a8435809fc0998595160e757bebb990f9fa665144ef0ba41a78a6
interface data {
    content : string
}
export async function POST(req:Request){
    const formData = req.formData();
    const content = (await formData).get('content') as string
    // console.log(content)
    const response = await together.chat.completions.create({
        messages: [{"role": "user", "content": `${content}`}],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });
    const message = response?.choices?.[0]?.message?.content ?? "Default message";
    console.log(message)
    return Response.json(new ApiResponse(200,message,"data get successfully from the ai"))
}