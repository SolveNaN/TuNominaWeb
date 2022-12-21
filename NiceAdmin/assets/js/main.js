/**
* Template Name: NiceAdmin - v2.4.1
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();
/*Variables para el salario minimo */
const SM=1160000;
const auxtr=160406;
const SBase=document.getElementById('IBC');
const SMMLV=document.getElementById('minimos');
const SMMLV2=document.getElementById('minimos2');
const SMMLV3=document.getElementById('minimos3');
const SMMLV4=document.getElementById('minimos4');
let miSMMLV='';
let calSMMLV=0;
/*Variables Salud Empleador */
const SalE=document.getElementById('saludEm');
let miSalE='';
let calSalE=0;
/*variables pension empleador */
const PensE=document.getElementById('pensEm');
let miPensE='';
let calPensE=0;
/*variables ARL empleador */
const arlE=document.getElementById('arlEm');
let miArlE='';
let calArlE=0;
/*variables Confenalco empleador */
const ConfE=document.getElementById('confe');
let miConFE='';
let calConFe=0;
/*variables Cesantias empleador */
const CeEmp=document.getElementById('cemp');
let miCeEmp='';
let calCeEmp=0;
/*variables Interes Cesantias empleador */
const ICeEmp=document.getElementById('icemp');
let miICeEmp='';
let calICeEmp=0;
/*variables Prima de servicios empleador */
const PriEmp=document.getElementById('priemp');
let miPriEmp='';
let calPriEmp=0;
/*variables Vacaciones empleador */
const VaEmp=document.getElementById('vaemp');
let miVaEmp='';
let calVaEmp=0;
/*variables Vacaciones empleador */
const TotEmp=document.getElementById('totemp');
let miTotEmp='';
let calTotEmp=0;
/*variables ICBF Empleador */
const ICBF=document.getElementById('icbf');
let miICBF='';
let calICBF=0;
/*variables sena Empleador */
const SENA=document.getElementById('sena');
let miSENA='';
let calSENA=0;
/*variables prima junio y diciembre */
const PriJun=document.getElementById('prijunio');
const PriDic=document.getElementById('pridic');
let miPriJun='';
let calPriJun=0;
/*Variable para el porcentaje total */
const PTot=document.getElementById('ptot');
let miPTot='';
let calPTot=0;
/*La funcion */

function calcular(){
  /*Para la camtidad de SMMLV */
  if(miSMMLV==''){
    calSMMLV=SBase.value/SM;
    calSMMLV=calSMMLV.toFixed(2);
    miSMMLV+=`<p>${calSMMLV}</p>`
    SMMLV.innerHTML=miSMMLV;
    SMMLV2.innerHTML=miSMMLV;
    SMMLV3.innerHTML=miSMMLV;
    SMMLV4.innerHTML=miSMMLV;
  }else{
    miSMMLV='';
    calSMMLV=SBase.value/SM;
    calSMMLV=calSMMLV.toFixed(2);
    miSMMLV+=`<p>${calSMMLV}</p>`
    SMMLV.innerHTML=miSMMLV;
    SMMLV2.innerHTML=miSMMLV;
    SMMLV3.innerHTML=miSMMLV;
    SMMLV4.innerHTML=miSMMLV;
  }
  /*Para Salud Empleador*/
if(miSalE==''){
  calSalE=SBase.value*0.085;
  calSalE=calSalE.toFixed(0);
  miSalE+=`<p>${calSalE}</p>`
  SalE.innerHTML=miSalE;
}else{
  miSalE='';
  calSalE=SBase.value*0.085;
  calSalE=calSalE.toFixed(0);
  miSalE+=`<p>${calSalE}</p>`
  SalE.innerHTML=miSalE;
}
/*para pension Empleador*/
if(miPensE==''){
  calPensE=SBase.value*0.12;
  calPensE=calPensE.toFixed(0);
  miPensE+=`<p>${calPensE}</p>`
  PensE.innerHTML=miPensE;
}else{
  miPensE='';
  calPensE=SBase.value*0.12;
  calPensE=calPensE.toFixed(0);
  miPensE+=`<p>${calPensE}</p>`
  PensE.innerHTML=miPensE;
}
 /*Funcion para Arl Empleador */
 if(miArlE==''){
  calArlE=SBase.value*0.0052;
  calArlE=calArlE.toFixed(0);
  miArlE+=`<p>${calArlE}</p>`
  arlE.innerHTML=miArlE;
 }else{
  miArlE='';
  calArlE=SBase.value*0.0052;
  calArlE=calArlE.toFixed(0);
  miArlE+=`<p>${calArlE}</p>`
  arlE.innerHTML=miArlE;
  }
  /*Funcion Confenalco Empleador*/
  if(miConFE==''){
    calConFe=SBase.value*0.04;
    calConFe=calConFe.toFixed(0);
    miConFE+=`<p>${calConFe}</p>`
    ConfE.innerHTML=miConFE;
   }else{
    miConFE='';
    calConFe=SBase.value*0.04;
    calConFe=calConFe.toFixed(0);
    miConFE+=`<p>${calConFe}</p>`
    ConfE.innerHTML=miConFE;
    }
  /*Funcion cesantias Empleador */
  if(miCeEmp==''){
    calCeEmp=((SBase.value)*1+auxtr)*0.0833;
    calCeEmp=calCeEmp.toFixed(0);
    miCeEmp+=`<p>${calCeEmp}</p>`
    CeEmp.innerHTML=miCeEmp;
   }else{
    miCeEmp='';
    calCeEmp=((SBase.value)*1+auxtr)*0.0833;
    calCeEmp=calCeEmp.toFixed(0);
    miCeEmp+=`<p>${calCeEmp}</p>`
    CeEmp.innerHTML=miCeEmp;
    }
      /*Funcion interes cesantias Empleador */
  if(miICeEmp==''){
    calICeEmp=((SBase.value)*1+auxtr)*0.01;
    calICeEmp=calICeEmp.toFixed(0);
    miICeEmp+=`<p>${calICeEmp}</p>`
    ICeEmp.innerHTML=miICeEmp;
   }else{
    miICeEmp='';
    calICeEmp=((SBase.value)*1+auxtr)*0.01;
    calICeEmp=calICeEmp.toFixed(0);
    miICeEmp+=`<p>${calICeEmp}</p>`
    ICeEmp.innerHTML=miICeEmp;
    }
      /*Funcion prima Empleador */
  if(miCeEmp==''){
    calCeEmp=((SBase.value)*1+auxtr)*0.0833;
    calCeEmp=calCeEmp.toFixed(0);
    miCeEmp+=`<p>${calCeEmp}</p>`
    PriEmp.innerHTML=miCeEmp;
   }else{
    miCeEmp='';
    calCeEmp=((SBase.value)*1+auxtr)*0.0833;
    calCeEmp=calCeEmp.toFixed(0);
    miCeEmp+=`<p>${calCeEmp}</p>`
    PriEmp.innerHTML=miCeEmp;
    }
         /*Funcion vacaciones Empleador */
  if(miVaEmp==''){
    calVaEmp=(SBase.value)*1*0.0417;
    calCeEmp=calVaEmp.toFixed(0);
    miVaEmp+=`<p>${calVaEmp}</p>`
    VaEmp.innerHTML=miVaEmp;
   }else{
    miVaEmp='';
    calVaEmp=(SBase.value)*1*0.0417;
    calVaEmp=calVaEmp.toFixed(0);
    miVaEmp+=`<p>${calVaEmp}</p>`
    VaEmp.innerHTML=miVaEmp;
    }
  /*Funcion calculo Total Valor Empleado */
  if(miTotEmp==''){
    calTotEmp=calSalE*1+calPensE*1+calArlE*1+calConFe*1+calICBF*1+calSENA*1+calCeEmp*1+calICeEmp*1+calPriEmp*1+calVaEmp*1+auxtr*1+SBase.value*1;
    calTotEmp=calTotEmp.toFixed(0);
    miTotEmp+=`<p>${calTotEmp}</p>`
    TotEmp.innerHTML=miTotEmp;
   }else{
    miTotEmp='';
    calTotEmp=calSalE*1+calPensE*1+calArlE*1+calConFe*1+calICBF*1+calSENA*1+calCeEmp*1+calICeEmp*1+calPriEmp*1+calVaEmp*1+auxtr*1+SBase.value*1;
    calTotEmp=calTotEmp.toFixed(0);
    miTotEmp+=`<p>${calTotEmp}</p>`
    TotEmp.innerHTML=miTotEmp;
    }
    /*Funcion para mostrar la prima en junio y diciembre */
    if(miPriJun==''){
      calPriJun=(SBase.value)/2;
      calPriJun=calPriJun.toFixed(0);
      miPriJun+=`<p>${calPriJun}</p>`
      PriJun.innerHTML=miPriJun;
      PriDic.innerHTML=miPriJun;
     }else{
      miPriJun='';
      calPriJun=(SBase.value)/2;
      calPriJun=calPriJun.toFixed(0);
      miPriJun+=`<p>${calPriJun}</p>`
      PriJun.innerHTML=miPriJun;
      PriDic.innerHTML=miPriJun;
      }
  /*Funcion para icbf Empleador */
    if(miICBF==''){
      calICBF=(SBase.value)*0.03;
      calICBF=calICBF.toFixed(0);
      miICBF+=`<p>${calICBF}  </p>`
      ICBF.innerHTML=miICBF;
     }else{
      miICBF='';
      calICBF=(SBase.value)*0.03;
      calICBF=calICBF.toFixed(0);
      miICBF+=`<p>${calICBF}  </p>`
      ICBF.innerHTML=miICBF;
      }
       /*Funcion para SENA Empleador */
    if(miSENA==''){
      calSENA=(SBase.value)*0.02;
      calSENA=calSENA.toFixed(0);
      miSENA+=`<p>${calSENA}  </p>`
      SENA.innerHTML=miSENA;
     }else{
      miSENA='';
      calSENA=(SBase.value)*0.02;
      calSENA=calSENA.toFixed(0);
      miSENA+=`<p>${calSENA}  </p>`
      SENA.innerHTML=miSENA;
      }
/*Calculo del porcentaje del valor de un empleado */
if(miPTot==''){
  calPTot=(calTotEmp/(SBase.value))*100;
  calPTot=calPTot.toFixed(0);
  miPTot+=`<p>${calPTot}%  </p>`
  PTot.innerHTML=miPTot;
 }else{
  miPTot='';
  calPTot=(calTotEmp/(SBase.value))*100;
  calPTot=calPTot.toFixed(0);
  miPTot+=`<p>${calPTot}%  </p>`
  PTot.innerHTML=miPTot;
  }
}