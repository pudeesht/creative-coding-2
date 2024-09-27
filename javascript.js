const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=850;

    

// const colorThemes = [
//     // Deep Space
//     {
//       name: "Cosmic Dust",
//       background: '#0C0032',
//       colors: ['#3500D3', '#190061', '#240090', '#282828', '#7A0BC0']
//     },
    
//     {
//         name :"claude se 1",
//         background:"#000000",
//         colors:['#FF3366', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7FFF7'],
//     },

//     {
//       name: "Nebula Burst",
//       background: '#0C0032',
//       colors: ['#FF2A6D', '#05D9E8', '#005678', '#01012B', '#FFC15E']
//     },
  
//     // Twilight Forest
//     {
//       name: "Enchanted Glade",
//       background: '#1E352F',
//       colors: ['#335145', '#7CA982', '#A4C2A8', '#D6EDC9', '#F7FFF6']
//     },
//     {
//       name: "Mystic Fireflies",
//       background: '#1E352F',
//       colors: ['#FFB30F', '#FD151B', '#8C5E58', '#4A051C', '#19647E']
//     },
  
//     // Desert Sands
//     {
//       name: "Golden Hour",
//       background: '#F2A65A',
//       colors: ['#772F1A', '#F58549', '#EEC170', '#F2A65A', '#FAC9B8']
//     },
//     {
//       name: "Oasis Dream",
//       background: '#F2A65A',
//       colors: ['#0F8B8D', '#143642', '#A8201A', '#DAD2D8', '#EC9A29']
//     }
//   ];
 
const colorThemes = [
    {
      name: "Midnight Auroras",
      background: '#0B0B1F',
      colors: ['#00FFFF', '#00FF00', '#FF00FF', '#FFFF00', '#87CEEB']
    },

    {
        name: "Twilight Blossoms",
        background: '#2E0854',  // Deep purple background
        colors: [
          '#FF69B4',  // Hot pink
          '#DA70D6',  // Orchid
          '#FF1493',  // Deep pink
          '#BA55D3',  // Medium orchid
          '#DDA0DD',  // Plum
          '#EE82EE',  // Violet
          '#FF00FF',  // Magenta
          '#8A2BE2',  // Blue violet
          '#9932CC',  // Dark orchid
          '#FFC0CB'   // Pink
        ]
      },

      {
                name :"claude se 1",
                background:"#000000",
                colors:['#FF3366', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7FFF7'],
            },

      {
        name: "Crimson Cascade",
        background: '#1A0000',  // Very dark red, almost black background
        colors: [
          '#FF0000',  // Pure red
          '#DC143C',  // Crimson
          '#B22222',  // Firebrick
          '#FF4500',  // Orange Red
          '#FF6347',  // Tomato
          '#CD5C5C',  // Indian Red
          '#F08080',  // Light Coral
          '#FA8072',  // Salmon
          '#E9967A',  // Dark Salmon
          '#FF69B4'   // Hot Pink (for a slight variation)
        ]
      }
      ,

    {
      name: "Ethereal Mist",
      background: '#0B0B1F',
      colors: ['#4B0082', '#8A2BE2', '#9370DB', '#E6E6FA', '#B0E0E6']
    },
  
    {
      name: "Forest Depths",
      background: '#1A2F23',
      colors: ['#7CFC00', '#32CD32', '#00FA9A', '#98FB98', '#F0FFF0']
    },
    // {
    //   name: "Autumn Whisper",
    //   background: '#1A2F23',
    //   colors: ['#FFA500', '#FF4500', '#FFD700', '#F4A460', '#FAFAD2']
    // },
  
    // {
    //   name: "Desert Mirage",
    //   background: '#3D3D3D',
    //   colors: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#6BCB77']
    // },
    // {
    //   name: "Neon Nights",
    //   background: '#3D3D3D',
    //   colors: ['#FF00FF', '#00FFFF', '#FF1493', '#39FF14', '#FFFF00']
    // }
  ];




    let colorthemeindex=0;


    const zoomslider =document.getElementById("zoomslider");
    let zoom= zoomslider.value;

    const curveslider =document.getElementById("curveslider");
    let curve= curveslider.value;

    
    const numberslider=document.getElementById("numberslider");
    let numberofparticles= numberslider.value;
    

    const showgrid=document.getElementById("grid");
    let grid=false;

    const changecolor=document.getElementById("color");

    const glowbtn=document.getElementById("glow");
    let glow=false;

    glowbtn.addEventListener("click",function(){
        
        if(effect.numberofparticles>400)
        {
            alert("For performance efficiency, reduce your number of particles before turning on glow");
        }
        else{

            
            glow=!glow;
            effect.particles=[];
            effect.init();
            console.log("glow is "+glow);
        }
    })
    

    changecolor.addEventListener("click",function()
    {
        colorthemeindex++;
        effect.particles=[];
        effect.init();
        console.log(colorThemes[colorthemeindex%colorThemes.length].name);

    })

    showgrid.addEventListener("click",function(){
        grid=!grid;
    } )

    zoomslider.addEventListener("input", function() {
        
        zoom=zoomslider.value;
        effect.clearparticles();
        effect.init();
      });

    curveslider.addEventListener("input", function() {
        
        curve=curveslider.value;
        effect.clearparticles();
        effect.init();
    });

    numberslider.addEventListener("input", function() {
        
        numberofparticles=numberslider.value;
        effect.clearparticles();
        effect.init();
    });





    //canvas settings
    ctx.fillStyle="white";
    // ctx.strokeStyle="#AA336A";


    class Particle{

        constructor(effect)
        {
            this.effect=effect;
            this.x=Math.floor(Math.random()*this.effect.width);
            this.y=Math.floor(Math.random()*this.effect.height);
            this.speedx;
            this.speedy;
            this.history=[{x:this.x,y:this.y}];
            this.maxlength=21 + Math.random() *350;
            this.angle=0;
            this.speedmodifier=Math.random()*1+1;
            this.timer=2*this.maxlength;


            // this.index=colorthemeindex%colorThemes.length;
            // this.theme= colorThemes[index];
            // this.colors=this.theme.colors;

            
            this.index=colorthemeindex%colorThemes.length;
            this.theme= colorThemes[this.index];
            this.colors=this.theme.colors;
            this.color=this.colors[Math.floor(Math.random()*this.colors.length)];

            // this.colors=['#FF3366', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7FFF7'];
            // this.color=this.colors[Math.floor(Math.random()*this.colors.length)];
            this.arcradius=1;
            
        }

        draw(context)
        {
            context.save();
            context.beginPath();

            
            // this.index=colorthemeindex%colorThemes.length;
            // this.theme= colorThemes[this.index];
            // this.colors=this.theme.colors;
            // this.color=this.colors[Math.floor(Math.random()*colorThemes.length)];


            if(glow)
            {
                // // context.save();
                context.shadowBlur=20;
                context.shadowColor=this.color;
                context.strokeStyle=this.color;
                context.lineWidth=2;

                // context.stroke();

                // context.restore();
            }
            

            context.fillStyle=this.color;
            if(this.history.length>10 )
            {
                context.arc(this.x, this.y, this.arcradius, 0, 2*Math.PI);
                context.fill()
                if(this.arcradius<3)
                    this.arcradius+=0.5;
            }
            else if (this.history.length<=10 )
            {
                context.arc(this.x, this.y, this.arcradius, 0, 2*Math.PI);
                context.fill();
                if(this.arcradius>0)
                    this.arcradius-=0.5;
            }
            context.strokeStyle=this.color + '80';
            // context.shadowBlur=10;
            // context.shadowColor=this.color;
            context.lineWidth=1.5;
            context.moveTo(this.history[0].x,this.history[0].y);
            for(let i=0 ; i < this.history.length ; i++)
            {
                context.lineTo(this.history[i].x,this.history[i].y);
            }
            context.stroke();
            context.restore();
        }


        // changetheme()
        // {
            
        //     this.index=colorthemeindex%colorThemes.length;
        //     this.theme= colorThemes[index];
        //     this.colors=this.theme.colors;

        // }
        







        update()
        {
            this.timer--;
            if (this.timer>=1)
            {
                let x= Math.floor(this.x/this.effect.cellsize);
                let y = Math.floor (this.y/this.effect.cellsize);
                let index=y*this.effect.cols + x;
        
                this.angle= this.effect.flowfield[index];
                
                this.speedx=Math.cos(this.angle)*this.speedmodifier;
                this.speedy=Math.sin(this.angle)*this.speedmodifier;
                
                this.x+=this.speedx ;
                this.y+=this.speedy ;
        
                this.history.push({x:this.x,y:this.y});
                if( this.history.length > this.maxlength)
                    this.history.shift();
            
            }
            else if (this.history.length>1)
            {
                this.history.shift();
            }
            else
            {
                this.reset();
            }
                
            
        }


        reset()
        {
            this.x=Math.floor(Math.random()*this.effect.width);
            this.y=Math.floor(Math.random()*this.effect.height);
            this.history=[{x:this.x,y:this.y}];
            this.timer=this.maxlength*2;
        }


    }


    class Effect{
        constructor(canvas)
        {
            this.canvas=canvas;
            this.width=this.canvas.width;
            this.height=this.canvas.height;
            this.particles=[];
            this.flowfield=[];
            this.numberofparticles=900;
            this.cellsize=25;
            this.rows;
            this.cols;
            this.curve=10.9;
            this.zoom=0.05;
            this.debug=false;
            this.init();
            window.addEventListener("keydown", e => {
                if (e.key==="d") this.debug=!this.debug;
            })

            window.addEventListener("resize", e => {
                // this.resize(e.target.innerWidth,e.target.innerHeight);
            })

        }
        clearparticles(){
            this.particles=[];
        }
        init()
        {
            this.rows=Math.floor(canvas.height/this.cellsize);
            this.cols=Math.floor(canvas.width/this.cellsize);
            this.flowfield=[];
            canvas.style.backgroundColor=colorThemes[colorthemeindex%colorThemes.length].background;
            for(let i =0; i<this.rows;i++)
            {
                for(let j=0 ; j<this.cols ; j++)

                {
                    // let angle= Math.cos(i*this.zoom)+Math.sin(j*this.zoom)*this.curve;
                    // let angle= (Math.cosh(i*zoom)+Math.sinh(j*zoom))*curve;
                    let angle= (Math.cos(i*zoom)*curve+Math.sin(j*zoom)*curve)
                    this.flowfield.push(angle);
                }
            }
            // console.log(this.flowfield);
            // this.particles=[]

            for(let i=0;i<numberofparticles;i++)
            {
                this.particles.push(new Particle(this));
            }
        }

        // particlesinit()
        // {
        //     this.particles.changetheme();
        // }


        drawgrid(context)
        {
            context.save();
            context.lineWidth=0.3;
            context.strokeStyle="white";

            for(let p=0;p<=this.width;p+=this.cellsize)
            {
                context.beginPath();
                context.moveTo(p,0);
                context.lineTo(p,this.height);
                context.stroke();
            }

            for(let q=0;q<=this.height;q+=this.cellsize)
                {
                    context.beginPath();
                    context.moveTo(0,q);
                    context.lineTo(this.width,q);
                    context.stroke();
                }
            context.restore();

        }


        resize(width,height)
        {
            this.canvas.width=width;
            this.canvas.height=height;
            this.width=this.canvas.width;
            this.height=this.canvas.height;
            // this.init();
            
        }

        render(context){
            if(grid) this.drawgrid(ctx);

            this.particles.forEach(particle=>{
                particle.draw(context);
                particle.update();
            })
            
        }

    }


    const effect=new Effect(canvas);

    function animate()
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        effect.render(ctx);
        requestAnimationFrame(animate);
    }

    animate();