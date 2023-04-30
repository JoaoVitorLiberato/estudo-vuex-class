import supabase from "../plugins/api/supabase"


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
  const { data, error } = await supabase
    .from(table)
    .update({
      ...form,
    })
    .match({ id })

  if(error) throw error

  return data
}

const remove = async (table, id) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .match({ id: id})
  if(error) throw error
  
  return data
}

export {
  post,
  list,
  update,
  remove
}