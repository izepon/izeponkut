import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response) {
    if(request.method === 'POST') {

        const TOKEN = '392e1acf6491086c0f1e2a635bd0d0';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType:"974482",
            ...request.body,
            // title: "Comunidade de teste", 
            // image: "#",
            // creatorSlug: "izepon"
        })
        
        console.log(registroCriado);

        response.json({
            dados:'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada do GET, mas no POST tem!'
    })
}
