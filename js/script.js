;

(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();



$(function(){

    $('.search__button').on("click", search);
    $('.search__text').on("keypress", function(e) {
        if(e.keyCode==13){
            search();
        }
    });
    
    function search(){

        var text = $('.search__text').val();
       
        $.ajax({
        url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBIrdOvGY6AafaKXDtE8hrrl7HFma1fnnY&cref&q=' + text,
        dataType: 'json',
        success: 
            function(data){
                var ul = document.createElement("ul");
                 $.each(data.items, function(i, val){
                         var li = document.createElement("li");
                         li.classList.add('result__item');
                         li.innerHTML = '<a class="result__link" href="'+val.formattedUrl+'" title="'+val.formattedUrl+'" target="_blank">'+val.title+"</a>" + '<p class="result__contant">' + val.htmlSnippet + '</p>';                            
                         ul.appendChild(li);
                 });
                 $('.result').html(ul);
            }            
        }); 
    }
	
    //EXAMPLE 2


    function Human() {
        this.name = 'name';
        this.age = 22;
        this.sex = 'men';
        this.height = 190;
        this.weight = 80;
    };

    function Worker() {
        this.job = 'google';
        this.salary = '500$';
        this.work = function(){
            console.log('I work');
        };
    };

    function Student() {
        this.university = 'dgma';
        this.scholarship = '830grn';
        this.lookTV = function(){
            console.log('I look TV');
        };
    };

    Worker.prototype = new Human();
    Student.prototype = new Human();

    var newWorker = new Worker;
    var newStudent = new Student;

    console.log(newWorker);
    console.log(newStudent);

});