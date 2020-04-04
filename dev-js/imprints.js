$(document).ready(()=>{

    
    $('.loader').show()
    axios.get('http://refringo.com:8080/readPage',{
        params:{
            typeof : 'Imprints'
        }
    })
    .then(response=>{
        console.log(response)
        if(response.status===200){
            $('.loader').hide();
            $('#description').html(response.data.response.description);
        }
    
    })
    .catch(err=>console.log(err))
})