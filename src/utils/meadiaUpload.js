import { createClient } from '@supabase/supabase-js'

const annon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dHdqY3d0cXpocXNjaHRuenVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNTQxODYsImV4cCI6MjA1NzYzMDE4Nn0.4rUCDoXuMN28IDzc-MhopTmaWm_R6yQr2Fh0Nwxy5_Q";

const supabaseUrl = "https://gutwjcwtqzhqschtnzuq.supabase.co";

const supabase = createClient(supabaseUrl, annon_key);

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {

        if (file === null) {
            reject("No file selected");
        }

        const timesStamp = new Date().getTime();
        const fileName = timesStamp + file.name;

        supabase.storage.from('images').upload(fileName, file,
            {
                cacheControl: '3600',
                upsert: false,
            }
        ).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch(()=>{
            reject("Error uploading file");
        })
    })


}