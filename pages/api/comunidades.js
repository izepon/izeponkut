import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response) {
    if(request.method === 'POST') {

        const TOKEN = '94b961c032e84b13f5665d65dfe15b';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType:"968377",
            ...request.body,
            // title: "Comunidade de teste", 
            // image: "#",
            // creatorSlug: "izepon"
        })
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
