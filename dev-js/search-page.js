$(document).ready(()=>{

    function getParameter(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search))
            return decodeURIComponent(name[1]);
    }

    searchCityParam = getParameter('city');
    searchCountryParam = getParameter('country');
    searchTitleParam = getParameter('title');

    var current_page = 0;
    let objJson = new Array();
    
    if(searchCityParam===''&&searchCountryParam===''&&searchTitleParam===''){
        $('.loader').hide();
        $('.no-content').show();
    }
    else{
        $.get('http://refringo.com:8080/jobs?country='+searchCountryParam+'&city='+searchCityParam+'&title='+searchTitleParam,function(data){
            // console.log(data)
            if(data.jobs.length===0){
                $('.loader').hide();
                $('.no-content').show();
            }
            else{
                function truncateString(str, num) {
                    if (str.length <= num) {
                        return str
                    }
                    return str.slice(0, num) + '...'
                }
                $.each(data.jobs,function(index,item){
                    
                    // console.log(item.date)
                    var htmlStr=''
                    htmlStr += '<tr><td><div class="card" id='+index+'>'
                    htmlStr += '<div class="card-body"style="text-align: left;align-self: start;">'
                    htmlStr += '<div style="text-align: left;align-self: start;"><h4 id='+item.url+' class="card-title" style="cursor:pointer;text-align:left;">'+item.title+'</h4>'
                    htmlStr += '<span class="card-title" style="text-align:left;"><span class="text-muted">by</span> '+item.company+'</span><br>'
                    htmlStr += '<span class="card-title" style="text-align:left;">'+item.city+', '+item.country+', '+item.state+'</span></div>'
                    
                    if(item.jobtype.toString().toLowerCase() === 'none'){
                        htmlStr += '<h5 class="card-subtitle mt-2" style="text-align: left;"></h5>'
                    }
                    else{
                        htmlStr += '<h5 class="card-subtitle mt-2" style="text-align: left;">'+item.jobtype+'</h5>'
                    }
                    htmlStr += '<p class="card-text" style="text-align: left;align-self: start;">'+truncateString(item.description,150)+'</p>'
                    if(item.date===undefined){
                        htmlStr += '<p class="text-muted"></p>'
                    }
                    else{
                        htmlStr += '<p class="text-muted">'+item.date+'</p>'
                    }
                    htmlStr += '</div>'
                    htmlStr += '</div></td></tr>'
                    $('#listings').append(htmlStr)
                    // objJson.push(htmlStr);
                })

                $('.load-content').fadeOut();
                $('#dtBasicExample').DataTable({
                    "searching": false ,
                });
                $('#dtBasicExample_info').hide()
                $('#dtBasicExample_info').fadeOut()
                $('.dataTables_length').addClass('bs-select');
                $('#dtBasicExample_length').hide();
                $('#dtBasicExample_length').fadeOut();
            }
        })
        // .then(resp=>{
        //     console.log(resp.data)
        //     if(resp.data.jobs.length===0){
        //         $('.loader').hide();
        //         $('.no-content').show();
        //     }
        //     else{
        //         console.log(resp.data.jobs)
        //         function truncateString(str, num) {
        //             if (str.length <= num) {
        //                 return str
        //             }
        //             return str.slice(0, num) + '...'
        //         }
            
        //         $.each(resp.data.jobs,function(index,item){
                    
        //             console.log(item.jobtype)
        //             var htmlStr=''
        //             htmlStr += '<tr><td><div class="card" id='+index+'>'
        //             htmlStr += '<div class="card-body"style="text-align: left;align-self: start;">'
        //             htmlStr += '<div style="text-align: left;align-self: start;"><h4 id='+item.url+' class="card-title" style="cursor:pointer;text-align:left;">'+item.title+'</h4>'
        //             htmlStr += '<span class="card-title" style="text-align:left;"><span class="text-muted">by</span> '+item.company+'</span><br>'
        //             htmlStr += '<span class="card-title" style="text-align:left;">'+item.city+', '+item.country+', '+item.state+'</span></div>'
                    
        //             if(item.jobtype.toString().toLowerCase() === 'none'){
        //                 htmlStr += '<h5 class="card-subtitle mt-2" style="text-align: left;"></h5>'
        //             }
        //             else{
        //                 htmlStr += '<h5 class="card-subtitle mt-2" style="text-align: left;">'+item.jobtype+'</h5>'
        //             }
        //             htmlStr += '<p class="card-text" style="text-align: left;align-self: start;">'+truncateString(item.description,150)+'</p>'
        //             htmlStr += '<span class="card-subtitle text-muted">'+item.date+'</span>'
        //             htmlStr += '</div>'
        //             htmlStr += '</div></td></tr>'
        //             $('#listings').append(htmlStr)
        //             // objJson.push(htmlStr);
        //         })
        //         $('.load-content').fadeOut();
        //             $('#dtBasicExample').DataTable();
        //             $('.dataTables_length').addClass('bs-select');
        //     }
        // })
        // .catch(err=>console.log(err))
    }
    let abrr = ['US','CA','DE','FR','GB','CH','AT','ES','IT','RU','PL']
    let country = ['United States','Canada', 'Germany', 'France', 'Great Britain', 'Switzerland', 'Austria', 'Spain', 'Italy', 'Russia', 'Poland'];

    let city = new Array();
    let title = new Array();

    // lists 
    axios.get('http://refringo.com:8080/lists')
    .then(resp=>{
        if(resp.status===200){
            // console.log(resp)
            $.each(resp.data.city, function(index,item){
                city.push(item);
                let htmlStr = '';
                htmlStr += '<option >'+item+'</option>'
                $('#cities').append(htmlStr);
            })
            $.each(country, function(index,item){
                let htmlStr = '';
                htmlStr += '<option value='+abrr[index]+'>'+item+'</option>'
                country.push(item);
                $('#countries').append(htmlStr);
            })
            $.each(resp.data.title, function(index,item){
                let htmlStr = '';
                htmlStr += '<option >'+item+'</option>'
                title.push(item);
                $('#titles').append(htmlStr);
            })
            
        }
    })
    .catch(er=>console.log(er))

    // fetch input data
    let city_val = '';
    let country_val = '';
    let title_val = '';
    $(document).on('change','#city',function(e){
        city_val = $(this).val() 
    })
    $(document).on('change','#country',function(e){
        country_val = $(this).val()
    })
    $(document).on('change','#title',function(e){
        title_val = $(this).val()
    })
    
    // search page redirection
    $(document).on('click','#search',function(){
        window.location.assign("./search-page.html?city="+city_val+"&country="+country_val+"&title="+title_val);
    })
    
    $(document).on('click','h4',function(){
        l = $(this).attr('id')
        localStorage.setItem('job',l);
        window.location.href = './job-page.html'
    })            

 
})