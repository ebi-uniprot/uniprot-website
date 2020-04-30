(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{513:function(t,e){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var i=new Uint8Array(16);t.exports=function(){return a(i),i}}else{var r=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),r[e]=t>>>((3&e)<<3)&255;return r}}},514:function(t,e){for(var a=[],i=0;i<256;++i)a[i]=(i+256).toString(16).substr(1);t.exports=function(t,e){var i=e||0,r=a;return[r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]]].join("")}},515:function(t,e){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var i=new Uint8Array(16);t.exports=function(){return a(i),i}}else{var r=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),r[e]=t>>>((3&e)<<3)&255;return r}}},516:function(t,e){for(var a=[],i=0;i<256;++i)a[i]=(i+256).toString(16).substr(1);t.exports=function(t,e){var i=e||0,r=a;return[r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],"-",r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]],r[t[i++]]].join("")}},528:function(t,e,a){var i=a(529),r=a(530),s=r;s.v1=i,s.v4=r,t.exports=s},529:function(t,e,a){var i,r,s=a(513),n=a(514),o=0,l=0;t.exports=function(t,e,a){var c=e&&a||0,p=e||[],d=(t=t||{}).node||i,h=void 0!==t.clockseq?t.clockseq:r;if(null==d||null==h){var u=s();null==d&&(d=i=[1|u[0],u[1],u[2],u[3],u[4],u[5]]),null==h&&(h=r=16383&(u[6]<<8|u[7]))}var g=void 0!==t.msecs?t.msecs:(new Date).getTime(),f=void 0!==t.nsecs?t.nsecs:l+1,v=g-o+(f-l)/1e4;if(v<0&&void 0===t.clockseq&&(h=h+1&16383),(v<0||g>o)&&void 0===t.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");o=g,l=f,r=h;var m=(1e4*(268435455&(g+=122192928e5))+f)%4294967296;p[c++]=m>>>24&255,p[c++]=m>>>16&255,p[c++]=m>>>8&255,p[c++]=255&m;var y=g/4294967296*1e4&268435455;p[c++]=y>>>8&255,p[c++]=255&y,p[c++]=y>>>24&15|16,p[c++]=y>>>16&255,p[c++]=h>>>8|128,p[c++]=255&h;for(var b=0;b<6;++b)p[c+b]=d[b];return e||n(p)}},530:function(t,e,a){var i=a(513),r=a(514);t.exports=function(t,e,a){var s=e&&a||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var n=(t=t||{}).random||(t.rng||i)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e)for(var o=0;o<16;++o)e[s+o]=n[o];return e||r(n)}},531:function(t,e,a){var i=a(532),r=a(533),s=r;s.v1=i,s.v4=r,t.exports=s},532:function(t,e,a){var i,r,s=a(515),n=a(516),o=0,l=0;t.exports=function(t,e,a){var c=e&&a||0,p=e||[],d=(t=t||{}).node||i,h=void 0!==t.clockseq?t.clockseq:r;if(null==d||null==h){var u=s();null==d&&(d=i=[1|u[0],u[1],u[2],u[3],u[4],u[5]]),null==h&&(h=r=16383&(u[6]<<8|u[7]))}var g=void 0!==t.msecs?t.msecs:(new Date).getTime(),f=void 0!==t.nsecs?t.nsecs:l+1,v=g-o+(f-l)/1e4;if(v<0&&void 0===t.clockseq&&(h=h+1&16383),(v<0||g>o)&&void 0===t.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");o=g,l=f,r=h;var m=(1e4*(268435455&(g+=122192928e5))+f)%4294967296;p[c++]=m>>>24&255,p[c++]=m>>>16&255,p[c++]=m>>>8&255,p[c++]=255&m;var y=g/4294967296*1e4&268435455;p[c++]=y>>>8&255,p[c++]=255&y,p[c++]=y>>>24&15|16,p[c++]=y>>>16&255,p[c++]=h>>>8|128,p[c++]=255&h;for(var b=0;b<6;++b)p[c+b]=d[b];return e||n(p)}},533:function(t,e,a){var i=a(515),r=a(516);t.exports=function(t,e,a){var s=e&&a||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var n=(t=t||{}).random||(t.rng||i)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,e)for(var o=0;o<16;++o)e[s+o]=n[o];return e||r(n)}},534:function(t){t.exports=JSON.parse('{"categories":[{"name":"DOMAINS_AND_SITES","label":"Domains & sites","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"domain","label":"Domain","filter":"DOMAIN","trackType":"protvista-track","tooltip":"Specific combination of secondary structures organized into a characteristic three-dimensional structure or fold"},{"name":"region","label":"Region","filter":"REGION","trackType":"protvista-track","tooltip":"Regions in multifunctional enzymes or fusion proteins, or characteristics of a region, e.g., protein-protein interactions mediation"},{"name":"motif","label":"Motif","filter":"MOTIF","trackType":"protvista-track","tooltip":"Short conserved sequence motif of biological significance"},{"name":"metal","label":"Metal binding","filter":"METAL","trackType":"protvista-track","tooltip":"Binding site for a metal ion"},{"name":"site","label":"Site","filter":"SITE","trackType":"protvista-track","tooltip":"Any interesting single amino acid site on the sequence"},{"name":"repeat","label":"Repeat","filter":"REPEAT","trackType":"protvista-track","tooltip":"Repeated sequence motifs or repeated domains within the protein"},{"name":"ca_bind","label":"Calcium binding","filter":"CA_BIND","trackType":"protvista-track","tooltip":"Calcium-binding regions, such as the EF-hand motif"},{"name":"dna_bind","label":"DNA binding","filter":"DNA_BIND","trackType":"protvista-track","tooltip":"DNA-binding domains such as AP2/ERF domain, the ETS domain, the Fork-Head domain, the HMG box and the Myb domain"},{"name":"zn_fing","label":"Zinc finger","filter":"ZN_FING","trackType":"protvista-track","tooltip":"Small, functional, independently folded domain that coordinates one or more zinc ions"},{"name":"np_bind","label":"Nucleotide binding","filter":"NP_BIND","trackType":"protvista-track","tooltip":"(aka flavin-binding). Region in the protein which binds nucleotide phosphates"},{"name":"binding","label":"Binding site","filter":"BINDING","trackType":"protvista-track","tooltip":"Binding site for any chemical group (co-enzyme, prosthetic group, etc.)"},{"name":"act_site","label":"Active site","filter":"ACT_SITE","trackType":"protvista-track","tooltip":"Amino acid(s) directly involved in the activity of an enzyme"}]},{"name":"MOLECULE_PROCESSING","label":"Molecule processing","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"signal","label":"Signal peptide","filter":"SIGNAL","trackType":"protvista-track","tooltip":"N-terminal signal peptide"},{"name":"chain","label":"Chain","filter":"CHAIN","trackType":"protvista-track","tooltip":"(aka mature region). This describes the extent of a polypeptide chain in the mature protein following processing"},{"name":"transit","label":"Transit peptide","filter":"TRANSIT","trackType":"protvista-track","tooltip":"This describes the extent of a transit peptide"},{"name":"init_met","label":"Initiator methionine","filter":"INIT_MET","trackType":"protvista-track","tooltip":"This indicates that the initiator methionine is cleaved from the mature protein"},{"name":"propep","label":"Propeptide","filter":"PROPEP","trackType":"protvista-track","tooltip":"Part of a protein that is cleaved during maturation or activation"},{"name":"peptide","label":"Peptide","filter":"PEPTIDE","trackType":"protvista-track","tooltip":"The position and length of an active peptide in the mature protein"}]},{"name":"PTM","label":"PTM","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"mod_res","label":"Modified residue","filter":"MOD_RES","trackType":"protvista-track","tooltip":"Modified residues such as phosphorylation, acetylation, acylation, methylation"},{"name":"carbohyd","label":"Glycosylation","filter":"CARBOHYD","trackType":"protvista-track","tooltip":"Covalently attached glycan group(s)"},{"name":"disulfid","label":"Disulfide bond","filter":"DISULFID","trackType":"protvista-track","tooltip":"The positions of cysteine residues participating in disulphide bonds"},{"name":"crosslnk","label":"Cross-link","filter":"CROSSLNK","trackType":"protvista-track","tooltip":"Covalent linkages of various types formed between two proteins or between two parts of the same protein"},{"name":"lipid","label":"Lipidation","filter":"LIPID","trackType":"protvista-track","tooltip":"Covalently attached lipid group(s)"}]},{"name":"SEQUENCE_INFORMATION","label":"Sequence information","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"compbias","label":"Compositional bias","filter":"COMPBIAS","trackType":"protvista-track","tooltip":"Position of regions of compositional bias within the protein and the particular amino acids that are over-represented within those regions"},{"name":"conflict","label":"Sequence conflict","filter":"CONFLICT","trackType":"protvista-track","tooltip":"Sequence discrepancies of unknown origin"},{"name":"non_cons","filter":"NON_CONS","trackType":"protvista-track","label":"Non-adjacent residues","tooltip":"Indicates that two residues in a sequence are not consecutive and that there is an undetermined number of unsequenced residues between them"},{"name":"non_ter","filter":"NON_TER","trackType":"protvista-track","label":"Non-terminal residue","tooltip":"The sequence is incomplete. The residue is not the terminal residue of the complete protein"},{"name":"unsure","filter":"UNSURE","trackType":"protvista-track","label":"Sequence uncertainty","tooltip":"Regions of a sequence for which the authors are unsure about the sequence assignment"},{"name":"non_std","filter":"NON_STD","trackType":"protvista-track","label":"Non-standard residue","tooltip":"Non-standard amino acids (selenocysteine and pyrrolysine)"}]},{"name":"STRUCTURAL","label":"Structural features","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"helix","label":"Helix","filter":"HELIX","trackType":"protvista-track","tooltip":"The positions of experimentally determined helical regions"},{"name":"strand","label":"Beta strand","filter":"STRAND","trackType":"protvista-track","tooltip":"The positions of experimentally determined beta strands"},{"name":"turn","label":"Turn","filter":"TURN","trackType":"protvista-track","tooltip":"The positions of experimentally determined hydrogen-bonded turns"},{"name":"coiled","label":"Coiled coil","filter":"COILED","trackType":"protvista-track","tooltip":"Coiled coils are built by two or more alpha-helices that wind around each other to form a supercoil"}]},{"name":"STRUCTURE_COVERAGE","label":"PDBe 3D structure coverage","trackType":"protvista-track","adapter":"protvista-structure-adapter","url":"https://www.ebi.ac.uk/proteins/api/proteins/","tracks":[{"name":"pdbe_cover","label":"PDBe coverage","trackType":"protvista-track","tooltip":"PDBe 3D structure coverage"}]},{"name":"TOPOLOGY","label":"Topology","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"topo_dom","label":"Topological domain","filter":"TOPO_DOM","trackType":"protvista-track","tooltip":"Location of non-membrane regions of membrane-spanning proteins"},{"name":"transmem","label":"Transmembrane","filter":"TRANSMEM","trackType":"protvista-track","tooltip":"Extent of a membrane-spanning region"},{"name":"intramem","label":"Intramembrane","filter":"INTRAMEM","trackType":"protvista-track","tooltip":"Extent of a region located in a membrane without crossing it"}]},{"name":"MUTAGENESIS","label":"Mutagenesis","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/features/","tracks":[{"name":"mutagen","label":"Mutagenesis","filter":"MUTAGEN","trackType":"protvista-track","tooltip":"Site which has been experimentally altered by mutagenesis"}]},{"name":"PROTEOMICS","label":"Proteomics","trackType":"protvista-track","adapter":"protvista-proteomics-adapter","url":"https://www.ebi.ac.uk/proteins/api/proteomics/","tracks":[{"name":"unique","label":"Unique peptide","filter":"unique","trackType":"protvista-track","tooltip":""},{"name":"non_unique","label":"Non-unique peptide","filter":"non_unique","trackType":"protvista-track","tooltip":""}]},{"name":"ANTIGEN","label":"Antigenic sequences","trackType":"protvista-track","adapter":"protvista-feature-adapter","url":"https://www.ebi.ac.uk/proteins/api/antigen/","tracks":[{"name":"antigen","label":"Antibody binding sequences","trackType":"protvista-track","tooltip":""}]},{"name":"INTERPRO_FAMILY","label":"InterPro Families","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=family"},{"name":"INTERPRO_DOMAIN","label":"InterPro Domains","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=domain"},{"name":"INTERPRO_HS","label":"InterPro homologous superfamilies","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=homologous_superfamily"},{"name":"INTERPRO_REPEAT","label":"InterPro repeats","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=repeat"},{"name":"INTERPRO_CONSERVED_SITES","label":"InterPro conserved sites","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=conserved_site"},{"name":"INTERPRO_ACTIVE_SITES","label":"InterPro active sites","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=active_site"},{"name":"INTERPRO_BINDING_SITES","label":"InterPro binding sites","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=binding_site"},{"name":"INTERPRO_ptm","label":"InterPro PTM","trackType":"protvista-interpro-track","adapter":"protvista-interpro-adapter","color":"rgba(50,50,200,0.5)","shape":"roundRectangle","url":"https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/{}?page_size=100&type=ptm"},{"name":"VARIATION","label":"Variants","adapter":"protvista-variation-adapter","trackType":"protvista-variation-graph","url":"https://www.ebi.ac.uk/proteins/api/variation/","tracks":[{"name":"variation_graph","trackType":"protvista-variation-graph"},{"name":"variation","filterComponent":"protvista-filter","trackType":"protvista-variation","tooltip":"Natural variant of the protein, including polymorphisms, variations between strains, isolates or cultivars, disease-associated mutations and RNA editing events"}]}],"download":[{"type":"features","url":"https://www.ebi.ac.uk/proteins/api/features/"},{"type":"variants","url":"https://www.ebi.ac.uk/proteins/api/variation/"},{"type":"antigens","url":"https://www.ebi.ac.uk/proteins/api/antigen/"},{"type":"proteomics","url":"https://www.ebi.ac.uk/proteins/api/proteomics/"}]}')},541:function(t,e,a){"use strict";var i=a(33),r=t=>{throw new Error(`Parameter '${t}' is required`)},s=(t=r("time"))=>new Promise(e=>setTimeout(e,t));let n="node";"undefined"!=typeof importScripts?n="worker":"undefined"!=typeof window&&(n="browser");var o=n;let l=()=>s(0);"browser"===o&&"requestAnimationFrame"in window&&(l=()=>new Promise(t=>window.requestAnimationFrame(t)));var c=l;let p;if("browser"===o&&"requestIdleCallback"in window)p=t=>new Promise(e=>window.requestIdleCallback(e,{timeout:t}));else{const t=Object.freeze({didTimeout:!0,timeRemaining:()=>1/0});if(p=e=>s((e||0)/2).then(()=>t),"browser"===o&&"requestAnimationFrame"in window){const e=p;p=()=>e().then(c).then(()=>t)}}const d=s,h=c;var u=a(171);const g=(t,e=0)=>{const a=(t||"").match(/(\d+\.?\d*)px/);return a?+a[1]:e};class f extends i.a{static get properties(){return{title:{type:String,reflect:!0},x:{type:Number,reflect:!0},y:{type:Number,reflect:!0},visible:{type:Boolean,reflect:!0},container:{type:String,reflect:!0}}}constructor(){super(),this.title="",this.x=0,this.y=0,this.visible=!1,this.container="html",this._changeHandler=()=>this.requestUpdate(),this._observer=new MutationObserver(this._changeHandler)}connectedCallback(){super.connectedCallback(),this._observer.observe(this,{subtree:!0,characterData:!0,childList:!0}),window.addEventListener("resize",this._changeHandler)}disconnectedCallback(){super.disconnectedCallback(),this._observer.disconnect(),window.removeEventListener("resize",this._changeHandler)}static get styles(){return i.b`
      :host {
        --z-index: 50000;
        --title-color: black;
        --text-color: white;
        --body-color: #616161;
        --triangle-width: ${16}px;
        --triangle-height: ${10}px;
        --triangle-margin: ${10}px;
        --vertical-distance: ${5}px;
      }

      .tooltip {
        font-family: Roboto, Arial, sans-serif;
        font-size: 0.9rem;
        top: 0;
        left: 0;
        display: block;
        position: absolute;
        min-width: 220px;
        max-width: 50vw;

        /* user overridable through custom properties */
        z-index: var(--z-index);
        color: var(--text-color);

        /* will change those */
        opacity: 0;
        pointer-events: none;
        transform: translate(0, 0);
      }

      .tooltip.visible {
        opacity: 0.9;
        pointer-events: auto;
      }

      .tooltip::before {
        content: "";
        position: absolute;
        pointer-events: none;
        border-style: solid;
        border-color: transparent;
        border-width: 0 calc(var(--triangle-width) / 2);
      }

      .tooltip.arrow-left::before {
        left: var(--triangle-margin);
      }

      .tooltip.arrow-right::before {
        right: var(--triangle-margin);
      }

      .tooltip.arrow-up::before {
        top: calc(-1 * var(--triangle-height));
        border-bottom-color: var(--title-color);
        border-bottom-width: var(--triangle-height);
      }

      .tooltip.arrow-down::before {
        bottom: calc(-1 * var(--triangle-height));
        border-top-color: var(--body-color);
        border-top-width: var(--triangle-height);
      }

      h1 {
        margin: 0;
        background-color: var(--title-color);
        line-height: 2em;
        padding: 0 1ch;
      }

      :host a,
      :host a:link,
      :host a:active,
      :host a:hover {
        color: #fff;
      }

      .tooltip-body {
        padding: 1em;
        background: var(--body-color);
        font-weight: normal;
        overflow-y: auto;
        max-height: 40vh;
      }

      ::slotted(h4) {
        font-size: 1.2rem !important;
        margin: 0 0 0.5rem 0 !important;
        font-weight: 600 !important;
        color: #fff !important;
      }

      ::slotted(h5) {
        font-size: 1rem !important;
        margin: 0 !important;
        font-weight: 500 !important;
        color: #fff !important;
      }

      ::slotted(p) {
        margin: 0.25rem 0 1rem 0 !important;
      }

      ::slotted(ul) {
        list-style: none !important;
        margin: 0.25rem 0 1rem 0 !important;
        padding: 0 !important;
      }
    `}_getPosition(){if(!this.shadowRoot.firstElementChild)return{};const t=document.querySelector(this.container||"html").getBoundingClientRect(),e=this.shadowRoot.firstElementChild.getBoundingClientRect(),a=getComputedStyle(this),i=g(a.getPropertyValue("--triangle-width"),16),r=g(a.getPropertyValue("--triangle-height"),10),s=g(a.getPropertyValue("--triangle-margin"),10),n=g(a.getPropertyValue("--vertical-distance"),5);let o=this.x-i/2-s,l="left";o+e.width<=t.right||(l="right",o=this.x-e.width+i/2+s);let c=this.y+r+n,p="up";return c+e.height<=t.height||(p="down",c=this.y-e.height-r-n),{x:o,y:c,horizontal:l,vertical:p}}firstUpdated(){this.requestUpdate()}render(){let t=this.title&&this.visible;const e=t?this._getPosition():{};t=e.x&&t;const a=t&&`transform: translate(${e.x}px, ${e.y}px);`;return i.c`
        <section
          class="tooltip arrow-${e.horizontal||"left"} arrow-${e.vertical||"up"} ${t?"visible":""}"
          style="${a}"
        >
          <h1>${this.title}</h1>
          <div class="tooltip-body"><slot></slot></div>
        </sectionclass="tooltip>
      `}}var v=f,m=a(157);class y extends m.a{init(t,e){let a=0;if(this.height={},this.yPos={},this.maxYPos=0,!t)return;this.innerPadding=3;const i={};for(let e=0;e<t.length;e++){const r=t[e];this.height[r.accession]=this.expanded?14:16,this.yPos[r.accession]=this._padding,a=this.height[r.accession]+2*this._padding,this.maxYPos=Math.max(this.maxYPos,a),r.accession in i||(i[r.accession]={}),r.residues&&(a=this._initResidues(r.residues,r.accession,r.locations,this.expanded?a:this.yPos[r.accession],e,i,this.expanded))}if(e)for(let t=0;t<e.length;t++){const r=e[t];r.accession in this.height||(this.height[r.accession]=10,this.yPos[r.accession]=(this.expanded?this.maxYPos:this.innerPadding)+this._padding,a+=2*this._padding+(this.expanded?this.height[r.accession]:0),this.maxYPos=Math.max(this.maxYPos,a)),r.accession in i||(i[r.accession]={}),r.residues&&(a=this._initResidues(r.residues,r.accession,r.locations,r.expanded?a:this.yPos[r.accession],t,i,r.expanded))}this.maxYPos+=this._padding}_initResidues(t,e,a,i,r,s={},n=!0){for(let o=0;o<t.length;o++){const l=t[o];y._filterOutResidueFragmentsOutOfLocation(l,a),l.accession in s[e]||(s[e][l.accession]={});for(let t=0;t<l.locations.length;t++){const a=l.locations[t].description;a in s[e][l.accession]||(s[e][l.accession][a]={height:n?10:this.height[e]-2*this.innerPadding,yPos:n?this.maxYPos+this._padding:i+this.innerPadding},i=n?this.maxYPos+2*this._padding+10:i),this.height[`${l.accession}_${r}_${o}_${t}`]=s[e][l.accession][a].height,this.yPos[`${l.accession}_${r}_${o}_${t}`]=s[e][l.accession][a].yPos,this.maxYPos=Math.max(this.maxYPos,i)}}return n?i:this.maxYPos+2*this._padding}static _filterOutResidueFragmentsOutOfLocation(t,e){t.locations.forEach(t=>t.fragments=t.fragments.filter(t=>e.some(e=>e.fragments.some(e=>t.start>=e.start&&t.end<=e.end)))),t.locations=t.locations.filter(t=>t.fragments.length)}static _getAccFromFeature(t){let e="";return"string"==typeof t?e=t:t.accession&&(e=t.accession),e}getFeatureYPos(t){const e=y._getAccFromFeature(t);return e in this.yPos?this.yPos[e]:0}getFeatureHeight(t){const e=y._getAccFromFeature(t);return e in this.height?this.height[e]:0}}const b=(t,e)=>{let a={value:1,...t};const i=[];for(const t of e)a?a.end<t.start?(i.push(a),a=null,i.push(t)):a.start<t.start&&a.end>=t.end?(i.push({start:a.start,end:t.start-1,value:a.value}),i.push({start:t.start,end:t.end,value:t.value+a.value}),a=t.end===a.end?null:{start:t.end+1,end:a.end,value:a.value}):t.start<a.start&&t.end>a.end?(i.push({start:t.start,end:a.start-1,value:t.value}),i.push({start:a.start,end:a.end,value:t.value+a.value}),i.push({start:a.end+1,end:t.end,value:t.value}),a=null):t.end>=a.start&&t.end<=a.end?(t.start<a.start&&i.push({start:t.start,end:a.start-1,value:t.value}),i.push({start:a.start,end:t.end,value:t.value+a.value}),a=t.end<a.end?{start:t.end+1,end:a.end,value:a.value}:null):a.end>=t.start&&a.end<t.end?(i.push({start:a.start,end:t.start-1,value:a.value}),i.push({start:t.start,end:a.end,value:t.value+a.value}),i.push({start:a.end+1,end:t.end,value:t.value}),a=null):i.push(t):i.push(t);return a&&i.push(a),i},k=2;class _ extends m.b{_createTrack(){this._layoutObj.expanded=this._expanded,super._createTrack(),this.children_g=null}connectedCallback(){super.connectedCallback(),this._expanded=this.hasAttribute("expanded"),this._haveCreatedFeatures=!1}attributeChangedCallback(t,e,a){if("expanded"===t&&e!==a&&this._contributors)for(const t of this._contributors)t.expanded=!e;super.attributeChangedCallback(t,e,a)}set contributors(t){this._contributors=_.normalizeLocations(t),this._coverage=((t,e=100,a=!0)=>{let i=[];return a&&(i=b({start:1,end:e,value:0},i)),t.forEach(t=>t.locations.forEach(t=>t.fragments.forEach(t=>{i=b(t,i)}))),i})(this._contributors,this._length),this._data&&this._createTrack()}getLayout(){return new y({layoutHeight:this._height,expanded:this._expanded,padding:2})}static get observedAttributes(){return m.b.observedAttributes.concat(["expanded","color"])}set color(t){this._color!==t&&(this._color=t,this.refresh())}static _createResidueGroup(t){return t.selectAll("g.residues-group").data(t=>t.residues?t.residues.map((e,a)=>({...e,feature:t,i:a})):[]).enter().append("g").attr("class","residues-group").selectAll("g.residues-locations").data(t=>t.locations.map((e,a)=>({...e,accession:t.accession,feature:t.feature,location:e,i:t.i,j:a}))).enter().append("g").attr("class","residues-locations")}_createResiduePaths(t){return t.selectAll("g.residue").data(t=>t.fragments.map(e=>({...e,accession:t.accession,feature:{...t.feature,currentResidue:{...e,description:t.location.description}},location:t.location,k:t.feature.k,i:t.i,j:t.j}))).enter().append("path").attr("class","feature rectangle residue").attr("d",t=>this._featureShape.getFeatureShape(this.getSingleBaseWidth(),this._layoutObj.getFeatureHeight(`${t.accession}_${t.k}_${t.i}_${t.j}`),t.end?t.end-t.start+1:1,"rectangle")).attr("transform",t=>`translate(${this.getXFromSeqPosition(t.start)},${k+this._layoutObj.getFeatureYPos(`${t.accession}_${t.k}_${t.i}_${t.j}`)})`).attr("fill",t=>this._getFeatureColor(t)).attr("stroke","transparent").call(this.bindEvents,this)}_refreshResiduePaths(t,e){const a=new Set(t.data().map(t=>`${t.feature.accession}-${t.location.description}`)).size;t.attr("d",t=>this._featureShape.getFeatureShape(this.getSingleBaseWidth(),this._layoutObj.getFeatureHeight(`${t.accession}_${t.k}_${t.i}_${t.j}`),t.end?t.end-t.start+1:1,"rectangle")).attr("transform",t=>`translate(${this.getXFromSeqPosition(t.start)},${k+this._layoutObj.getFeatureYPos(`${t.accession}_${t.k}_${t.i}_${t.j}`)})`).style("pointer-events",t=>e||t.feature&&t.feature.expanded?"auto":"none").style("stroke",()=>e?null:"none").style("opacity",()=>e?null:.8/a).attr("fill",t=>e||t.feature&&t.feature.expanded?this._getFeatureColor(t):"white")}static get margin(){return{top:0,right:10,bottom:0,left:10}}_createFeatures(){if(this._layoutObj.init(this._data,this._contributors),this._data.forEach((t,e)=>t.k=e),this.featuresG=this.seq_g.selectAll("g.feature-group").data(this._data).enter().append("g").attr("class","feature-group").attr("id",t=>"g_"+t.accession),this.locations=this.featuresG.selectAll("g.location-group").data(t=>t.locations.map(e=>({...e,feature:t}))).enter().append("g").attr("class","location-group"),this.coverLines=this.locations.selectAll("line.cover").data(t=>[t.fragments.reduce((e,a)=>({start:Math.min(e.start,a.start),end:Math.max(e.end,a.end),feature:t.feature}),{start:1/0,end:-1/0})]).enter().append("line").attr("class","cover"),this.features=this.locations.selectAll("path.feature").data(t=>t.fragments.map(e=>({...e,feature:t.feature,fragments:t.fragments}))).enter().append("path").attr("class",t=>this._getShape(t)+" feature").on("click.expanded",()=>{this._expanded?this.removeAttribute("expanded"):this.setAttribute("expanded","expanded")}).call(this.bindEvents,this),this.residues_g=_._createResidueGroup(this.featuresG),this.residues_loc=this._createResiduePaths(this.residues_g),this._contributors){this._contributors.forEach((t,e)=>t.k=e),this.children_g||(this.children_g=this.svg.append("g").attr("class","children-features")),this.childrenGroup=this.children_g.append("g").attr("class","children-group"),this.childGroup=this.childrenGroup.selectAll("g.child-group").data(this._contributors).enter().append("g").attr("class","child-group");const t=this.childGroup.selectAll("g.child-location-group").data(t=>(t.expanded=this._expanded,t.locations.map(e=>({...e,feature:t})))).enter().append("g").attr("class",(t,e)=>"child-location-group clg-"+e);this.coverLinesChildren=t.selectAll("line.cover").data(t=>[t.fragments.reduce((e,a)=>({start:Math.min(e.start,a.start),end:Math.max(e.end,a.end),feature:t.feature}),{start:1/0,end:-1/0})]).enter().append("line").attr("class","cover"),this.featureChildren=t.selectAll("path.child-fragment").data(t=>t.fragments.map(e=>({...e,feature:t.feature,fragments:t.fragments}))).enter().append("path").attr("class",t=>this._getShape(t)+" child-fragment feature").call(this.bindEvents,this).on("click.expanded",t=>{t.feature.expanded=!t.feature.expanded,this.refresh()}),this.child_residues_g=_._createResidueGroup(this.childGroup),this.child_residues_loc=this._createResiduePaths(this.child_residues_g),this._coverage&&this._coverage.length&&this._createCoverage()}this.svg.attr("height",this._layoutObj.maxYPos),this._haveCreatedFeatures=!0}_createCoverage(){this._accession=this._data&&this._data[0]&&this._data[0].accession||"_",this.coverage_mask=this.svg.append("defs").append("mask").attr("id","mask-"+this._accession),this.coverageMaskFragment=this.coverage_mask.selectAll("rect").data(this._coverage).enter().append("rect").attr("y",0).attr("height",this._height)}_refreshCoverage(){this.featuresG.attr("mask",this._expanded?null:`url(#mask-${this._accession})`),this.coverageMaskFragment.attr("x",t=>this.getXFromSeqPosition(t.start)).attr("width",t=>this.getSingleBaseWidth()*(t.end-t.start+1)).attr("fill","white").attr("opacity",t=>(t.value/this._contributors.length+.3)/1.3)}_refreshFeatures(t,e=!0){const a=new Set(t.data().map(t=>t.feature.accession)).size;t.attr("d",t=>this._featureShape.getFeatureShape(this.getSingleBaseWidth(),this._layoutObj.getFeatureHeight(t.feature),t.end?t.end-t.start+1:1,e?this._getShape(t.shape?t:t.feature):"rectangle")).attr("fill",t=>e?this._getFeatureColor(t.feature):"white").attr("opacity",e?1:.8/a).style("stroke",t=>e?this._getFeatureColor(t.feature):"none").attr("transform",t=>`translate(${this.getXFromSeqPosition(t.start)},${k+this._layoutObj.getFeatureYPos(t.feature)})`).style("pointer-events",e?"auto":"none")}_refreshCoverLine(t,e=!0){t.attr("x1",t=>this.getXFromSeqPosition(t.start)).attr("x2",t=>this.getXFromSeqPosition(t.end+1)).attr("y1",t=>k+this._layoutObj.getFeatureYPos(t.feature)+this._layoutObj.getFeatureHeight(t.feature)/2).attr("y2",t=>k+this._layoutObj.getFeatureYPos(t.feature)+this._layoutObj.getFeatureHeight(t.feature)/2).attr("stroke",t=>this._getFeatureColor(t.feature)).attr("visibility",e?"visible":"hidden")}refresh(){this._haveCreatedFeatures&&(this._layoutObj.expanded=this._expanded,this._layoutObj.init(this._data,this._contributors),this.height=this._layoutObj.maxYPos,this._refreshCoverLine(this.coverLines),this._refreshFeatures(this.features),this._refreshResiduePaths(this.residues_loc,this._expanded),this._contributors&&(this.childrenGroup.attr("visibility",this._expanded?"visible":"hidden"),this._refreshCoverLine(this.coverLinesChildren,this._expanded),this._refreshFeatures(this.featureChildren,this._expanded),this.child_residues_g.attr("visibility",()=>this._expanded?"visible":"hidden"),this._refreshResiduePaths(this.child_residues_loc),this._coverage&&this._coverage.length&&this._refreshCoverage()),this._updateHighlight(),this.svg.attr("height",this._layoutObj.maxYPos))}}var w=_,T=a(170),C=a(287),x=a(8);class $ extends m.b{constructor(){super(),this._line=Object(x.g)().x((t,e)=>this.getXFromSeqPosition(e+1)-this.getSingleBaseWidth()/2).y(t=>this._yScale(t))}init(){this._totalsArray={total:null,diseaseTotal:null}}connectedCallback(){super.connectedCallback(),this._data=void 0,this._height=Number(this.getAttribute("height"))||40,this._yScale=Object(x.i)(),this.init()}set data(t){if(this.init(),t.sequence&&!(t.variants.length<=0)){this._totalsArray.total=new Uint8ClampedArray(t.sequence.length),this._totalsArray.diseaseTotal=new Uint8ClampedArray(t.sequence.length);for(const{start:e,association:a}of t.variants){const i=+e;i<1||i>t.sequence.length||(this._totalsArray.total[i]++,a&&a.find(t=>!0===t.disease)&&this._totalsArray.diseaseTotal[i]++)}this._createTrack()}}_createTrack(){Object(x.l)(this).selectAll("svg").remove(),this.svg=Object(x.l)(this).append("svg").attr("width",this.width).attr("height",this._height),this.trackHighlighter.appendHighlightTo(this.svg),this._initYScale(),this.refresh()}_initYScale(){this._yScale.domain([0,Math.max(Object(x.h)(this._totalsArray.total),Object(x.h)(this._totalsArray.diseaseTotal))]).range([this._height,0])}refresh(){this.svg&&(this.svg.selectAll("path").remove(),this.svg.append("path").attr("d",this._line(this._totalsArray.diseaseTotal)).attr("fill","none").attr("stroke","red").attr("transform","translate(0,0)"),this.svg.append("path").attr("d",this._line(this._totalsArray.total)).attr("fill","none").attr("stroke","darkgrey").attr("transform","translate(0,0)"),this._updateHighlight())}}var P=$,S=a(281),R=a(114),E=(a(257),function(t,e,a,i){return new(a||(a=Promise))((function(r,s){function n(t){try{l(i.next(t))}catch(t){s(t)}}function o(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(n,o)}l((i=i.apply(t,e||[])).next())}))});const A=new Map,O=(t,e=new Headers({accept:"application/json"}))=>{const a=A.get(t);if(a)return a;const i=E(void 0,void 0,void 0,(function*(){const a=yield window.fetch(t,{headers:e});if(!a.ok)throw new Error(`Request Failed: Status = ${a.status}; URI = ${t}; Time = ${new Date}`);return 204===a.status?{payload:null,headers:a.headers}:{payload:yield a.json(),headers:a.headers}}));return A.set(t,i),i.catch(()=>A.delete(t)),i};HTMLElement;var q=a(113),I=a(528);const F=t=>{let e=[];return t&&0!==t.length&&(e=t.features.map(t=>Object.assign(t,{category:"PROTEOMICS",type:t.unique?"unique":"non_unique",tooltipContent:Object(q.b)(t),protvistaFeatureId:Object(I.v1)()})),e=Object(q.e)(e)),e};q.a;var N=a(531);const D=t=>{let e=[];if(t&&0!==t.length){e=(t=>{if(!t||t.length<=0)return[];const e=t.sort((t,e)=>t.start-e.start),a=[];return e.forEach(t=>{const e=a[a.length-1];!e||e.end<t.start?a.push(t):e.end<t.end?(e.end=t.end,e.structures.push(t.structures[0])):e.structures.push(t.structures[0])}),a})((t=>t.dbReferences.filter(t=>"PDB"===t.type).map(t=>{const e=t.properties.chains?(t=>{const e=t.indexOf("="),a=t.indexOf("-");return-1===e||-1===a?{start:0,end:0}:{start:+t.slice(e+1,a),end:+t.slice(a+1)}})(t.properties.chains):{start:0,end:0};return{type:"PDBE_COVER",category:"STRUCTURE_COVERAGE",structures:[{description:(a=t.properties,Object.keys(a).reduce((t,e)=>{return`${t}${i=e,i.charAt(0).toUpperCase()+i.slice(1)}: ${a[e]}. `;var i},"")),start:e.start,end:e.end,source:{id:t.id,url:"http://www.ebi.ac.uk/pdbe-srv/view/entry/"+t.id}}],start:e.start,end:e.end};var a}))(t)),e.forEach(t=>{t.tooltipContent=(t=>{const e=`<ul>\n            ${t.structures.map(t=>`<li style="margin: 0.25rem 0"><a style="color:#FFF" href='${t.source.url}' target='_blank'>\n            ${t.source.id}\n        </a> (${t.start}-${t.end})</li>`).join("")}\n        </ul>`;return""+(e?"<h5>Structures</h5>"+e:"")})(t),t.protvistaFeatureId=Object(N.v1)()})}return e};q.a;var M=a(289);const j=t=>{try{return t.results.map(({metadata:t,proteins:e})=>({...t,locations:e[0].entry_protein_locations,start:Math.min(...e[0].entry_protein_locations.map(t=>Math.min(...t.fragments.map(t=>t.start)))),end:Math.max(...e[0].entry_protein_locations.map(t=>Math.max(...t.fragments.map(t=>t.end)))),tooltipContent:`\n        <h5>Accession</h5>\n        <a\n          target="_blank"\n          rel="noopener"\n          href="https://www.ebi.ac.uk/interpro/entry/InterPro/${t.accession}/"\n        >\n        ${t.accession}\n        </a>\n        <h5>Name</h5>\n        <p>${t.name}</p>\n      `,length:e[0].protein_length}))}catch(t){throw new Error("Failed transforming the data")}};HTMLElement;var L=a(534),B=a(290),U=a(121);const z=function(t,e){customElements.get(t)||customElements.define(t,e)},G=[{name:"PDB",link:"https://www.ebi.ac.uk/pdbe-srv/view/entry/"},{name:"RCSB-PDB",link:"https://www.rcsb.org/structure/"},{name:"PDBj",link:"https://pdbj.org/mine/summary/"},{name:"PDBsum",link:"https://www.ebi.ac.uk/pdbsum/"}];class H extends i.a{constructor(){super(),z("protvista-structure",B.a),z("protvista-datatable",U.a),this.onTableRowClick=this.onTableRowClick.bind(this)}static get properties(){return{accession:{type:String},pdbId:{type:String},data:{type:Object}}}async connectedCallback(){if(super.connectedCallback(),!this.accession)return;const t="https://www.ebi.ac.uk/proteins/api/proteins/"+this.accession,{payload:e}=await O(t);if(!e)return;const a=(t=>t.dbReferences.filter(t=>"PDB"===t.type).sort((t,e)=>t.id.localeCompare(e.id)).map(({id:t,properties:e})=>{if(!e)return null;const{chains:a,resolution:i,method:r}=e;let s,n;if(a){const t=a.split("=");2===t.length&&([s,n]=t)}return{id:t,method:r,resolution:i&&"-"!==i?i:null,chain:s,positions:n,protvistaFeatureId:t}}))(e);if(!a||!a.length)return;this.data=a;const r=this.querySelector("protvista-datatable");this.pdbId=this.data[0].id,r.columns={type:{label:"PDB Entry",resolver:({id:t})=>t},method:{label:"Method",resolver:({method:t})=>t},resolution:{label:"Resolution",resolver:({resolution:t})=>t&&t.replace("A","Å")},chain:{label:"Chain",resolver:({chain:t})=>t},positions:{label:"Positions",resolver:({positions:t})=>t},links:{label:"Links",resolver:({id:t})=>i.c`
        ${G.map(e=>i.c` <a href="${e.link}${t}">${e.name}</a> `).reduce((t,e)=>i.c` ${t} · ${e} `)}
      `}},r.data=this.data,r.rowClickEvent=this.onTableRowClick,r.selectedid=this.pdbId}onTableRowClick({id:t}){this.pdbId=t}createRenderRoot(){return this}render(){return i.c`
      <div>
        ${this.pdbId?i.c`<protvista-structure
              pdb-id=${this.pdbId}
              accession=${this.accession}
            ></protvista-structure>`:i.c``}
        <protvista-datatable noScrollToRow noDeselect></protvista-datatable>
      </div>
    `}}var Y=H,V=a(495);const W="#990000",X="#99cc00",J="#002594",Z="#8FE3FF",K="#009e73",Q=[/disease/i,/pathogenic\b/i,/risk factor/i],tt=[/benign/i],et=[/uncertain/i,/conflicting/i,/unclassified/i],at=(t,e)=>e.some(e=>e.test(t)),it=(t,e)=>t.map(t=>{const a=t.variants.filter(t=>e(t));return{...t,variants:[...a]}}),rt=[{name:"disease",type:{name:"consequence",text:"Filter Consequence"},options:{labels:["Likely disease"],colors:[W]},filterData:t=>it(t,t=>at(t.clinicalSignificances,Q))},{name:"predicted",type:{name:"consequence",text:"Filter Consequence"},options:{labels:["Predicted deleterious","Predicted benign"],colors:[J,Z]},filterData:t=>it(t,t=>void 0!==t.polyphenScore||void 0!==t.siftScore)},{name:"nonDisease",type:{name:"consequence",text:"Filter Consequence"},options:{labels:["Likely benign"],colors:[X]},filterData:t=>it(t,t=>at(t.clinicalSignificances,tt))},{name:"uncertain",type:{name:"consequence",text:"Filter Consequence"},options:{labels:["Uncertain"],colors:[K]},filterData:t=>it(t,t=>void 0===t.clinicalSignificances&&void 0===t.polyphenScore&&void 0===t.siftScore||at(t.clinicalSignificances,et))},{name:"UniProt",type:{name:"provenance",text:"Filter Provenance"},options:{labels:["UniProt reviewed"],colors:["#9f9f9f"]},filterData:t=>it(t,t=>t.xrefNames&&(t.xrefNames.includes("uniprot")||t.xrefNames.includes("UniProt")))},{name:"ClinVar",type:{name:"provenance",text:"Filter Provenance"},options:{labels:["ClinVar reviewed"],colors:["#9f9f9f"]},filterData:t=>it(t,t=>t.xrefNames&&(t.xrefNames.includes("ClinVar")||t.xrefNames.includes("clinvar")))},{name:"LSS",type:{name:"provenance",text:"Filter Provenance"},options:{labels:["Large scale studies"],colors:["#9f9f9f"]},filterData:t=>it(t,t=>"large_scale_study"===t.sourceType||"mixed"===t.sourceType)}],st=Object(V.a)().domain([0,1]).range([J,Z]),nt=t=>{const e=[{variants:[t]}];return rt.find(t=>"disease"===t.name).filterData(e)[0].variants.length>0?W:rt.find(t=>"nonDisease"===t.name).filterData(e)[0].variants.length>0?X:rt.find(t=>"uncertain"===t.name).filterData(e)[0].variants.length>0?K:rt.find(t=>"predicted"===t.name).filterData(e)[0].variants.length>0?(a=t.polyphenScore,i=t.siftScore,st((i||0+(1-a?a:1))/(a&&i?2:1))):K;var a,i};var ot=rt;const lt=q.f,ct=F,pt=D,dt=M.a,ht={"protvista-feature-adapter":lt,"protvista-interpro-adapter":j,"protvista-proteomics-adapter":ct,"protvista-structure-adapter":pt,"protvista-variation-adapter":dt};class ut extends i.a{constructor(){super(),this.openCategories=[],this.notooltip=!1,this.nostructure=!1,this.hasData=!1,this.data={},this.displayCoordinates=null}static get properties(){return{suspend:{type:Boolean,reflect:!0},accession:{type:String,reflect:!0},sequence:{type:String},data:{type:Object},openCategories:{type:Array},config:{type:Object},notooltip:{type:Boolean,reflect:!0},nostructure:{type:Boolean,reflect:!0}}}get cssStyle(){return i.c`
      <style>
        protvista-tooltip a {
          text-decoration: underline;
        }
        .track-content {
          width: 80vw;
        }

        .nav-container,
        .category,
        .category__track {
          display: flex;
          margin-bottom: 0.1rem;
        }

        .category-label,
        .track-label,
        .action-buttons,
        .credits {
          width: 20vw;
          padding: 0.5em;
        }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .category-label {
          background-color: #b2f5ff;
          cursor: pointer;
        }

        .category-label::before {
          content: " ";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #333;
          margin-right: 5px;
          -webkit-transition: all 0.1s;
          /* Safari */
          -o-transition: all 0.1s;
          transition: all 0.1s;
        }

        .category-label.open::before {
          content: " ";
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #333;
          margin-right: 5px;
        }

        .track-label {
          background-color: #d9faff;
        }

        protvista-track {
          border-top: 1px solid #d9faff;
        }

        .feature {
          cursor: pointer;
        }
      </style>
    `}registerWebComponents(){z("protvista-navigation",u.a),z("protvista-tooltip",v),z("protvista-track",m.b),z("protvista-interpro-track",w),z("protvista-sequence",T.a),z("protvista-variation",C.a),z("protvista-variation-graph",P),z("protvista-filter",S.a),z("protvista-manager",R.a),z("protvista-uniprot-structure",Y)}_loadData(){const t=this.config.categories.map(({name:t,url:e,adapter:a,tracks:i})=>{const r=e.indexOf("{}")>=0?e.replace("{}",this.accession):`${e}${this.accession}`;return d(/interpro/.test(r)?100:0).then(()=>O(r)).then(({payload:e})=>{if(!e)return;const r=a?ht[a](e):e;if(this.data[t]="protvista-feature-adapter"===a?r.filter(({category:e})=>!e||e===t):r,i)for(const e of i)this.data[`${t}-${e.name}`]=Array.isArray(r)&&e.filter?r.filter(({type:t})=>t===e.filter):r;else if(Array.isArray(r))for(const e of r)this.data[`${t}-${e.accession}`]=[e];this.requestUpdate()})});return Promise.all(t)}async _loadDataInComponents(){await h(),Object.entries(this.data).forEach(([t,e])=>{const a=document.getElementById("track-"+t);a&&a.data!==e&&(a.data=e);const i=this.config.categories.filter(({name:e})=>e===t);if(i.length&&i[0].tracks)for(const e of i[0].tracks){const a=document.getElementById(`track-${t}-${e.name}`);a&&(a.data=this.data[`${t}-${e.name}`])}})}updated(t){super.updated(t);const e=this.querySelector("protvista-filter");e&&e.filters!==ot&&(e.filters=ot);const a=this.querySelector("protvista-variation");if(a&&a.colorConfig!==nt&&(a.colorConfig=nt),t.has("suspend")){if(this.suspend)return;this._init()}this._loadDataInComponents()}_init(){this.config||(this.config=L),this.accession&&(this.loadEntry(this.accession).then(t=>{this.sequence=t.sequence.sequence,this.displayCoordinates={start:1,end:this.sequence.length}}),this._loadData())}connectedCallback(){super.connectedCallback(),this.registerWebComponents(),this.suspend||this._init(),this.addEventListener("change",t=>{t.detail.displaystart&&(this.displayCoordinates.start=t.detail.displaystart),t.detail.displayend&&(this.displayCoordinates.end=t.detail.displayend),this.notooltip||(t.detail.eventtype?"click"===t.detail.eventtype&&this.updateTooltip(t,!0):this._resetTooltip())}),this.notooltip||(this.addEventListener("click",t=>{if(!t.target.closest(".feature")&&!t.target.closest("protvista-tooltip")){this.querySelector("protvista-tooltip").visible=!1}}),document.addEventListener("click",this._resetTooltip)),this.addEventListener("load",t=>{this.hasData||(this.dispatchEvent(new CustomEvent("protvista-event",{detail:{hasData:!0},bubbles:!0})),this.hasData=!0)})}disconnectedCallback(){this.notooltip||document.removeEventListener("click",this._resetTooltip)}_resetTooltip(t){if(this&&(!t||!t.target.closest("protvista-uniprot"))){const t=this.querySelector("protvista-tooltip");t&&(t.visible=!1)}}async loadEntry(t){try{return await(await fetch("https://www.ebi.ac.uk/proteins/api/proteins/"+t)).json()}catch(t){console.error("Couldn't load UniProt entry",t)}}createRenderRoot(){return this}render(){return this.sequence&&this.config&&!this.suspend?i.c`
      ${this.cssStyle}
      <protvista-manager
        attributes="length displaystart displayend highlight activefilters filters"
        additionalsubscribers="protvista-structure"
      >
        <div class="nav-container">
          <div class="action-buttons">
            <download-panel
              accession="${this.accession}"
              config="${JSON.stringify(this.config.download)}"
            />
          </div>
          <div class="track-content">
            <protvista-navigation
              length="${this.sequence.length}"
            ></protvista-navigation>
            <protvista-sequence
              length="${this.sequence.length}"
              sequence="${this.sequence}"
              displaystart=${this.displayCoordinates.start}
              displayend="${this.displayCoordinates.end}"
            ></protvista-sequence>
          </div>
        </div>
        ${this.config.categories.map(t=>this.data[t.name]&&i.c`
              <div class="category" id="category_${t.name}">
                <div
                  class="category-label"
                  data-category-toggle="${t.name}"
                  @click="${this.handleCategoryClick}"
                >
                  ${t.label}
                </div>

                <div
                  data-id="category_${t.name}"
                  class="aggregate-track-content track-content"
                  .style="${this.openCategories.includes(t.name)?"opacity:0":"opacity:1"}"
                >
                  ${this.data[t.name]&&this.getTrack(t.trackType,"non-overlapping",t.color,t.shape,t.name)}
                </div>
              </div>

              <!-- Expanded Categories -->
              ${t.tracks&&t.tracks.map(e=>{if(this.openCategories.includes(t.name)){const a=this.data[`${t.name}-${e.name}`];return a&&(Array.isArray(a)&&a.length||Object.keys(a).length)?i.c`
                        <div class="category__track" id="track_${e.name}">
                          <div class="track-label" title="${e.tooltip}">
                            ${e.filterComponent?this.getFilterComponent(`${t.name}-${e.name}`):e.label}
                          </div>
                          <div
                            class="track-content"
                            data-id="track_${e.name}"
                          >
                            ${this.getTrack(e.trackType,"non-overlapping",e.color||t.color,e.shape||t.shape,`${t.name}-${e.name}`)}
                          </div>
                        </div>
                      `:""}})}
              ${t.tracks?"":this.data[t.name].map(e=>{if(this.openCategories.includes(t.name))return e&&e.accession?i.c`
                        <div
                          class="category__track"
                          id="track_${e.accession}"
                        >
                          <div class="track-label" title="${e.accession}">
                            ${e.accession}
                          </div>
                          <div
                            class="track-content"
                            data-id="track_${e.accession}"
                          >
                            ${this.getTrack(t.trackType,"non-overlapping",t.color,t.shape,`${t.name}-${e.accession}`)}
                          </div>
                        </div>
                      `:""})}
            `)}
        <div class="nav-container">
          <div class="credits"></div>
          <div class="track-content">
            <protvista-sequence
              length="${this.sequence.length}"
              sequence="${this.sequence}"
              displaystart=${this.displayCoordinates.start}
              displayend="${this.displayCoordinates.end}"
            ></protvista-sequence>
          </div>
        </div>
        ${this.nostructure?"":i.c`
              <protvista-uniprot-structure
                accession="${this.accession||""}"
              ></protvista-uniprot-structure>
            `}
        <protvista-tooltip />
      </protvista-manager>
    `:i.c``}async updateTooltip(t){const e=t.detail.feature;if(!e.tooltipContent)return;const a=this.querySelector("protvista-tooltip");a.title=`${e.type} ${e.start}-${e.end}`,a.innerHTML=e.tooltipContent,a.visible=!0;const[i,r]=t.detail.coords;a.x=i,a.y=r}handleCategoryClick(t){const e=t.target.getAttribute("data-category-toggle");t.target.classList.contains("open")?(t.target.classList.remove("open"),this.openCategories=[...this.openCategories].filter(t=>t!==e)):(t.target.classList.add("open"),this.openCategories=[...this.openCategories,e])}getCategoryTypesAsString(t){return t.map(t=>t.filter).join(",")}getFilterComponent(t){return i.c`
      <protvista-filter
        style="minWidth: 20%"
        for="track-${t}"
      ></protvista-filter>
    `}getTrack(t,e="",a="",r="",s=""){switch(t){case"protvista-track":return i.c`
          <protvista-track
            length="${this.sequence.length}"
            layout="${e}"
            color="${a}"
            shape="${r}"
            displaystart="${this.displayCoordinates.start}"
            displayend="${this.displayCoordinates.end}"
            id="track-${s}"
          >
          </protvista-track>
        `;case"protvista-interpro-track":return i.c`
          <protvista-interpro-track
            length="${this.sequence.length}"
            color="${a}"
            shape="${r}"
            displaystart="${this.displayCoordinates.start}"
            displayend="${this.displayCoordinates.end}"
            id="track-${s}"
          >
          </protvista-interpro-track>
        `;case"protvista-variation":return i.c`
          <protvista-variation
            length="${this.sequence.length}"
            displaystart="${this.displayCoordinates.start}"
            displayend="${this.displayCoordinates.end}"
            id="track-${s}"
          >
          </protvista-variation>
        `;case"protvista-variation-graph":return i.c`
          <protvista-variation-graph
            length="${this.sequence.length}"
            displaystart="${this.displayCoordinates.start}"
            displayend="${this.displayCoordinates.end}"
            id="track-${s}"
          >
          </protvista-variation-graph>
        `;default:console.warn("No Matching ProtvistaTrack Found.")}}}e.a=ut}}]);