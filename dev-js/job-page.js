$(document).ready(()=>{

    searchParam = localStorage.getItem('job')

    $(document).on('click','#apply-now',function(){
        $('#apply-now').fadeOut();
        $('.loader').fadeIn();
            
        axios.get('http://refringo.com:8080/apply',{
            params: {
                url :  searchParam
            }        
        })
        .then(resp=>{
            // console.log(resp.data)
            window.location.href = resp.data.newURL;
        })
        .catch(err=>console.log(err))
    })

    link = 'http://refringo.com:8080/job';
    axios.get('http://refringo.com:8080/job',{
    
        params: {
            url :  searchParam
        }
    
    })
    .then(resp=>{
        // localStorage.removeItem('job');
        if(resp.data.jobs===null){

            $('.load-content').fadeOut();
            $('.no-content').fadeIn();

        }
        else{

            let data = resp.data
                document.getElementById('img').src = data.jobs.logo;
                $('#title').html(data.jobs.title)
                $('#company').html(data.jobs.company)
                $('#address').html(data.jobs.city+', '+data.jobs.country+', '+data.jobs.state)
                if(data.jobs.jobtype.toString().toLowerCase()==='none'){
                    $('#job-type').html('')
                }
                else{
                    $('#job-type').html(data.jobs.jobtype)
                }
                // +'<span style="margin-left:20px;"> '+data.jobs['job-category']+'</span>'
                if(data.jobs.posted_date===undefined){
                    $('#posted-date').html('')
                }
                else{
                    $('#posted-date').html('Posted on '+data.jobs.posted_date)
                }
                $('#description').html(data.jobs.description)
    
            $('.load-content').fadeOut();
            $('.profile').fadeIn();
        }
    })
    .catch()

})