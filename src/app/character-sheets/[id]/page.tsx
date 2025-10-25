import { CharacterSheetDetails } from "./_ui/charactersheetdetails";

export default async function HomePage({params} : {params : Promise<{ id : number }>}) {
  const {id} = await params;
  return <CharacterSheetDetails id={id}/>
}
