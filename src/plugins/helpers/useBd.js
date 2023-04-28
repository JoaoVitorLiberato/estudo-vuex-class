import supabase from "../api/supabase"


const post = async ( table, form ) => {
  const { data, error } = await supabase
    .from(table)
    .insert([{
      ...form
    }])
  
  if(error) throw error

  return data
}

const list = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
  
  if(error) throw error

  return data
}

const update = async (table, form, id) => {
  const { data, error, count } = await supabase
    .from(table)
    .update({
      ...form,
    })
    .match({ id })

  console.log(count)

  if(error) throw error

  return data
}

export {
  post,
  list,
  update
}