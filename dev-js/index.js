$(document).ready(()=>{

    
    $('.loader').show()

    let abrr = ['US','CA','DE','FR','GB','CH','AT','ES','IT','RU','PL']
    let country = ['United States','Canada', 'Germany', 'France', 'Great Britain', 'Switzerland', 'Austria', 'Spain', 'Italy', 'Russia', 'Poland'];

    let city = new Array();
    let title = new Array();

    let subCities;
    // lists 
    axios.get('http://refringo.com/lists')
    .then(resp=>{
        if(resp.status===200){
            $.each(resp.data.city, function(index,item){
                city.push(item);
                let htmlStr = '';
                htmlStr += '<option >'+item+'</option>'
                $('#cities').append(htmlStr);
            })
            $.each(country, function(index,item){
                let htmlStr = '';
                htmlStr += '<option value='+abrr[index]+'>'+item+'</option>'
                // country.push(item);
                $('#countries').append(htmlStr);
            })
            $.each(resp.data.title, function(index,item){
                let htmlStr = '';
                htmlStr += '<option >'+item+'</option>'
                title.push(item);
                $('#titles').append(htmlStr);
            })
            $('.loader').hide()
            $('.form-row').show()
        }
    })
    .catch()

    // flags
    let cityFlag = false;
    let countryFlag = false;
    let titleFlag = false;
    
    // fetch input data
    let city_val = '';
    let country_val = '';
    let title_val = '';
    $(document).on('change','#city',function(e){
        city_val = $(this).val() 
        let backup = city;
        let result = backup.filter(val => val === city_val)
        if(result[0]===undefined){
            $('#modalText').html('Please Select Valid City.')
            $('#myModal').modal()
            city_val = '' 
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }
        else{
            // console.log(city_val)         
        }
       
    })
    $(document).on('change','#country',function(e){
        let subCity = new Array();

        country_val = $(this).val()
        let backup = abrr;
        let result = backup.filter(val => val === country_val)
        if(result[0]===undefined){
            $('#modalText').html('Please Select Valid Country.')
            $('#myModal').modal()
            country_val = '' 
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }
        else{
            // console.log(country_val);
            countryFlag = true;
        }


        axios.get('http://refringo.com/city?country='+country_val)
        .then(resp=>{
            if(resp.status===200){
                $.each(resp.data.city, function(index,item){
                    subCity.push(item);
                })
                subCities = subCity; 
            }
        })
        .catch()

    })
    $(document).on('change','#title',function(e){
        title_val = $(this).val()
        let backup = title;
        let result = backup.filter(val => val === title_val)
        if(result[0]===undefined){
            $('#modalText').html('Please Select Valid Title.')
            $('#myModal').modal()
            title_val = '' 
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }else{
            console.log(title_val);
            titleFlag = true;
        }

    })
    
    // search page redirection
    $(document).on('click','#search',function(){

        $('.loader1').show();
        $('#search').hide();
        if(city_val!==''&&country_val!==''){
            let backup = subCities;
            const result = backup.filter(val => val === city_val);
            if(result[0]===undefined){
                setTimeout(()=>{
                    $('.loader1').hide();
                    $('#search').show();
                    window.location.assign("./search-page.html?city=&country="+country_val+"&title="+title_val);
                },1000)
            }
            else{
                setTimeout(()=>{
                    $('.loader1').hide();
                    $('#search').show();
                    window.location.assign("./search-page.html?city="+result[0]+"&country="+country_val+"&title="+title_val);
                },1000)
            }
        }
        else{
            setTimeout(()=>{
                $('.loader1').hide();
                $('#search').show();
                window.location.assign("./search-page.html?city="+city_val+"&country="+country_val+"&title="+title_val);    
            },1000)
        }
    })

})