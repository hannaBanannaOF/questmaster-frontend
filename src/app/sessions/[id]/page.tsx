import { SessionDetail } from "./_ui/sessiondetails";

export default async function HomePage({params} : {params : Promise<{ id : number }>}) {
  const {id} = await params;
  return <SessionDetail id={id}/>
}
