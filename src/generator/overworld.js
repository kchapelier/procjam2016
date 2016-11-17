"use strict";


var PoissonDiskSampling = require('poisson-disk-sampling'),
    makeWordGenerator = require('ngram-word-generator');

//var model = {"config":{"name":null,"n":3,"minLength":4,"unique":1,"excludeOriginal":1},"data":{"e":{"abe":[{"ber":1},0],"ber":[{"erd":0.6666667,"ern":0.3333333},{"ert":1}],"erd":[{"rda":0.5,"rde":0.5},0],"rda":[{"dar":1},0],"dar":[0,{"are":1}],"are":[0,0],"rde":[{"dee":1},0],"dee":[0,{"een":1}],"een":[{"enh":0.3333333,"eni":0.3333333,"eno":0.3333333},0],"air":[{"ird":1},0],"ird":[{"rdr":1},0],"rdr":[{"dri":0.5,"dro":0.5},0],"dri":[0,{"rie":1}],"rie":[{"ies":1},{"ies":1}],"all":[{"lla":0.3333333,"llo":0.3333333,"lly":0.3333333},0],"lla":[{"lac":1},{"lan":1}],"lan":[{"ant":1},{"ang":0.5,"and":0.5}],"llo":[{"loc":1},{"loa":1}],"loa":[{"oan":1},0],"and":[{"ndr":1},0],"ndr":[{"dre":1},0],"dre":[{"rew":0.5,"reg":0.5},0],"rew":[{"ews":1},{"ews":1}],"ews":[{"wsh":1},0],"arb":[{"rbr":0.5,"rbe":0.5},0],"rbr":[{"bro":1},0],"bro":[{"roa":0.5,"rox":0.5},0],"roa":[{"oat":1},0],"oat":[{"atb":1},{"ath":0.5,"ats":0.5}],"ath":[{"thg":1},0],"ard":[{"rdr":0.3333333,"rdi":0.3333333,"rdg":0.3333333},{"rds":1}],"dro":[{"ros":0.5,"rom":0.5},0],"ros":[{"oss":0.6666667,"osy":0.3333333},0],"oss":[{"ssa":0.5,"ssg":0.5},0],"ssa":[0,{"san":1}],"san":[0,0],"bal":[{"alg":0.25,"all":0.75},0],"alg":[{"lgo":1},0],"lgo":[{"gon":1},0],"gon":[{"oni":1},0],"oni":[{"nif":1},{"nie":1}],"nie":[0,0],"loc":[0,{"och":1}],"och":[{"che":1},0],"lly":[{"lyc":0.5,"lym":0.5},0],"lyc":[{"ycl":1},0],"ycl":[{"cla":1},0],"cla":[{"lar":1},0],"lar":[{"ark":0.5,"arb":0.25,"arn":0.25},{"are":1}],"lym":[{"ymo":1},0],"ymo":[{"mon":1},0],"mon":[{"one":0.3333333,"oni":0.3333333,"onk":0.3333333},{"ont":1}],"one":[0,{"ney":1}],"ney":[0,0],"ban":[{"anb":0.3333333,"ank":0.3333333,"ann":0.3333333},{"ank":1}],"anb":[{"nbr":1},0],"nbr":[{"bri":1},0],"bri":[{"rid":0.75,"rig":0.25},0],"rid":[{"idg":1},{"ide":1}],"idg":[0,{"dge":1}],"dge":[0,0],"ank":[{"nkn":1},0],"nkn":[{"kno":1},0],"kno":[{"noc":1},0],"noc":[{"ock":1},{"ock":1}],"ock":[{"ckb":1},0],"ann":[{"nno":1},0],"nno":[{"noc":0.5,"now":0.5},0],"ckb":[{"kbu":1},0],"kbu":[{"bur":1},0],"bur":[{"urg":1},{"urn":1}],"urn":[0,0],"bar":[{"arg":0.2,"arm":0.2,"arr":0.2,"art":0.2,"arc":0.2},0],"arg":[{"rge":1},0],"rge":[{"ged":1},0],"ged":[{"edd":1},0],"edd":[{"ddi":1},0],"ddi":[{"dis":0.25,"din":0.75},{"die":1}],"die":[0,0],"arm":[{"rmo":1},0],"rmo":[{"mou":1},0],"mou":[{"out":1},0],"out":[0,{"uth":1}],"uth":[{"the":1},0],"arr":[{"rrh":0.25,"rro":0.5,"rre":0.25},0],"rrh":[{"rhe":1},0],"rhe":[{"hea":1},0],"hea":[0,{"ead":1}],"ead":[0,0],"bat":[{"ath":1},0],"thg":[{"hga":1},0],"hga":[{"gat":1},0],"gat":[{"ate":1},{"ate":1}],"ate":[0,{"tes":1}],"bea":[{"ear":1},0],"ear":[{"ars":0.5,"arn":0.5},{"ary":1}],"ars":[{"rsd":0.5,"rsh":0.5},0],"rsd":[{"sde":1},0],"sde":[0,{"den":1}],"den":[{"enn":1},0],"bel":[{"elf":0.5,"ell":0.5},0],"elf":[{"lfa":1},0],"lfa":[{"fas":1},0],"fas":[0,{"ast":1}],"ast":[{"stl":1},0],"ell":[{"lls":1},0],"lls":[{"lsh":0.5,"lsb":0.5},0],"lsh":[{"shi":1},0],"shi":[{"hil":0.3333333,"hie":0.3333333,"hir":0.3333333},0],"hil":[{"ill":1},{"ill":1}],"ill":[{"lls":0.5,"llo":0.5},0],"bet":[{"eth":1},0],"eth":[{"the":0.6666667,"thi":0.3333333},0],"the":[{"hes":0.25,"her":0.75},{"hes":1}],"hes":[{"esd":1},0],"esd":[0,{"sda":1}],"sda":[0,0],"bis":[{"ish":1},0],"ish":[{"sho":0.5,"sha":0.5},0],"sho":[{"hop":0.5,"hor":0.5},0],"hop":[{"opb":1},0],"opb":[{"pbr":1},0],"pbr":[{"bri":1},0],"rig":[{"igg":0.5,"igh":0.5},{"igg":1}],"igg":[0,{"ggs":1}],"ggs":[0,0],"bla":[{"lac":0.5,"lan":0.5},0],"lac":[{"ack":0.5,"ace":0.5},0],"ack":[{"ckb":1},0],"ant":[{"nty":1},0],"nty":[{"tyr":0.5,"typ":0.5},0],"tyr":[0,{"yre":1}],"yre":[0,0],"ble":[{"lea":1},0],"lea":[{"ear":1},0],"ary":[0,0],"bon":[{"onh":0.3333333,"onn":0.6666667},0],"onh":[{"nhi":1},0],"nhi":[{"hil":1},0],"onn":[{"nny":1},0],"nny":[{"nyb":0.3333333,"nyr":0.3333333,"nyl":0.3333333},0],"nyb":[{"ybr":1},0],"ybr":[{"bri":1},0],"nyr":[{"yri":1},0],"yri":[{"rig":1},0],"bot":[{"oth":1},0],"oth":[{"thw":0.3333333,"the":0.6666667},0],"thw":[{"hwe":1},0],"hwe":[{"wel":1},0],"wel":[0,{"ell":1}],"bow":[{"owl":1},0],"owl":[{"wli":1},0],"wli":[{"lin":1},0],"lin":[{"int":0.5,"inw":0.5},{"ing":0.5,"ine":0.25,"int":0.25}],"ing":[{"ngs":0.6666667,"ngm":0.3333333},0],"bra":[{"rad":1},0],"rad":[{"adl":1},0],"adl":[{"dle":1},0],"dle":[0,{"ley":1}],"ley":[0,0],"igh":[{"ght":1},0],"ght":[{"hto":1},0],"hto":[{"ton":1},0],"ton":[0,{"ons":0.3333333,"one":0.6666667}],"ons":[{"nsh":1},0],"rox":[{"oxb":1},0],"oxb":[{"xbu":1},0],"xbu":[{"bur":1},0],"buc":[{"uck":1},0],"uck":[{"ckh":1},0],"ckh":[{"kha":1},0],"kha":[{"hav":0.5,"hal":0.5},0],"hav":[{"ave":1},0],"ave":[{"ver":1},{"ven":1}],"ven":[{"ens":1},0],"bus":[{"usb":0.5,"usl":0.5},0],"usb":[0,{"sby":1}],"sby":[0,0],"cal":[{"ald":1},0],"ald":[{"lde":0.5,"lda":0.5},{"ldy":1}],"lde":[{"der":1},{"der":1}],"der":[{"err":0.5,"ers":0.5},0],"cam":[{"amb":1},0],"amb":[{"mbu":1},0],"mbu":[{"bus":1},0],"usl":[{"sla":1},0],"sla":[{"lan":1},0],"ang":[{"nge":1},0],"car":[{"ard":0.2,"arf":0.2,"arl":0.2,"arr":0.4},0],"rdi":[{"dif":1},0],"dif":[0,{"iff":1}],"iff":[{"ffn":1},0],"arf":[{"rfi":1},0],"rfi":[0,{"fin":1}],"fin":[0,0],"arl":[{"rlu":1},0],"rlu":[{"luk":1},0],"luk":[0,{"uke":1}],"uke":[0,0],"rro":[{"ron":1},{"ron":1}],"ron":[{"ons":1},0],"nsh":[{"sho":1},0],"hor":[{"orn":1},{"ore":0.5,"orn":0.5}],"ore":[0,0],"cha":[{"hap":1},{"han":1}],"hap":[{"ape":1},0],"ape":[{"pel":1},0],"pel":[{"elh":1},0],"elh":[{"lha":1},0],"lha":[{"hal":1},0],"hal":[{"ald":1},{"all":1}],"chu":[{"hur":1},0],"hur":[{"urc":0.5,"url":0.5},0],"urc":[0,{"rch":1}],"rch":[{"cha":1},0],"ark":[{"rks":0.3333333,"rkh":0.3333333,"rki":0.3333333},0],"rks":[{"kst":1},0],"kst":[{"sto":1},0],"sto":[{"tow":0.3333333,"ton":0.6666667},{"ton":1}],"cly":[{"lyd":1},0],"lyd":[{"yde":1},0],"yde":[{"deb":1},0],"deb":[{"eba":1},0],"eba":[{"ban":1},0],"coa":[{"oal":0.3333333,"oat":0.6666667},0],"oal":[{"alt":1},0],"alt":[{"lto":0.5,"ltc":0.5},0],"lto":[{"tow":1},{"ton":1}],"tow":[{"own":1},{"own":1}],"own":[{"wnp":0.5,"wna":0.5},0],"atb":[{"tbr":1},0],"tbr":[{"bri":1},0],"col":[{"ole":0.5,"olw":0.5},0],"ole":[{"ler":1},0],"ler":[{"era":1},0],"era":[{"rai":1},0],"rai":[{"ain":1},0],"ain":[0,{"ine":0.5,"ins":0.5}],"ine":[0,0],"olw":[{"lwy":1},0],"lwy":[0,{"wyn":1}],"wyn":[0,0],"com":[{"omb":1},0],"omb":[{"mbe":1},0],"mbe":[{"ber":1},{"ber":1}],"coo":[{"ook":1},0],"ook":[{"oks":0.5,"oke":0.5},0],"oks":[{"kst":1},0],"cor":[{"orw":1},0],"orw":[{"rwe":1},0],"rwe":[{"wel":1},{"wen":1}],"wen":[0,0],"cow":[{"owb":1},0],"owb":[{"wbr":1},0],"wbr":[{"bri":1},0],"cro":[{"roo":0.3333333,"ros":0.3333333,"rof":0.3333333},0],"roo":[{"ook":1},0],"oke":[{"ked":1},0],"ked":[{"edh":1},0],"edh":[{"dho":1},0],"dho":[{"hol":1},0],"hol":[{"oly":1},{"olm":1}],"olm":[{"lmo":1},0],"ssg":[{"sga":1},0],"sga":[{"gat":1},0],"tes":[0,0],"cum":[{"umb":1},0],"umb":[{"mbe":0.5,"mba":0.5},0],"ern":[{"rna":0.5,"rne":0.5},0],"rna":[{"nau":1},0],"nau":[{"aul":1},0],"aul":[0,{"uld":1}],"uld":[0,0],"dal":[{"alk":1},0],"alk":[{"lke":0.5,"lki":0.5},0],"lke":[{"kei":1},0],"kei":[{"eit":1},0],"eit":[{"ith":1},{"ith":1}],"ith":[{"thi":1},0],"enn":[{"nny":0.5,"nno":0.5},{"nny":1}],"nyl":[{"ylo":1},0],"ylo":[{"loa":1},0],"oan":[{"anh":1},0],"anh":[{"nhe":1},0],"nhe":[{"hea":1},0],"err":[0,{"rry":1}],"rry":[0,0],"dow":[{"own":1},{"own":1}],"wnp":[{"npa":1},0],"npa":[{"pat":1},0],"pat":[{"atr":1},0],"atr":[{"tri":1},0],"tri":[{"ric":1},0],"ric":[0,{"ick":1}],"ick":[0,0],"reg":[{"egh":1},0],"egh":[{"gho":1},0],"gho":[{"hor":1},0],"orn":[{"rnl":0.5,"rnt":0.5},0],"rom":[{"omo":1},0],"omo":[{"mor":1},0],"mor":[0,{"ore":1}],"dum":[{"umb":0.5,"umf":0.5},0],"mba":[{"bar":1},0],"art":[{"rto":0.3333333,"rth":0.3333333,"rte":0.3333333},0],"rto":[0,{"ton":1}],"umf":[{"mfr":0.5,"mfo":0.5},0],"mfr":[{"fri":1},0],"fri":[{"rie":1},0],"ies":[{"est":1},0],"dun":[{"und":0.25,"unf":0.25,"uni":0.25,"unt":0.25},0],"und":[{"nde":1},0],"nde":[0,{"dee":1}],"unf":[{"nfe":1},0],"nfe":[{"fer":1},0],"fer":[{"erm":1},0],"erm":[{"rml":1},0],"rml":[{"mli":1},0],"mli":[{"lin":1},0],"uni":[{"nip":1},0],"nip":[{"ipa":1},0],"ipa":[{"pac":1},0],"pac":[0,{"ace":1}],"ace":[{"ceh":0.5,"ces":0.5},0],"unt":[{"nto":1},0],"nto":[{"toc":1},{"ton":1}],"toc":[{"och":1},0],"che":[0,{"her":1}],"her":[{"erw":0.3333333,"erl":0.3333333,"erg":0.3333333},0],"edi":[{"din":1},0],"din":[{"inb":0.3333333,"ing":0.6666667},{"ing":1}],"inb":[{"nbu":1},0],"nbu":[{"bur":1},0],"urg":[0,{"rgh":1}],"rgh":[0,0],"egl":[{"gli":1},0],"gli":[{"lin":1},0],"int":[{"nto":0.5,"nti":0.5},0],"eld":[{"lde":1},0],"ers":[{"rsl":0.5,"rsk":0.5},0],"rsl":[{"sli":1},0],"sli":[0,{"lie":1}],"lie":[{"ieb":1},0],"elg":[{"lgi":1},0],"lgi":[0,{"gin":1}],"gin":[0,0],"rsk":[{"ski":1},0],"ski":[{"kin":1},0],"kin":[{"int":0.5,"inc":0.5},{"ine":1}],"fal":[{"alk":1},0],"lki":[{"kir":1},0],"kir":[{"irk":1},{"irk":1}],"irk":[{"rkc":0.5,"rki":0.5},0],"fli":[{"lin":1},0],"gal":[{"ala":1},0],"ala":[{"las":1},0],"las":[{"ash":0.5,"asg":0.5},0],"ash":[{"shi":1},0],"hie":[{"iel":1},0],"iel":[0,{"els":0.3333333,"eld":0.6666667}],"els":[0,0],"gif":[{"iff":1},0],"ffn":[{"fno":1},0],"fno":[{"noc":1},0],"gla":[{"las":1},0],"asg":[{"sgo":1},0],"sgo":[0,{"gow":1}],"gow":[{"owr":1},0],"gle":[{"len":1},{"len":1}],"len":[{"enr":0.5,"enz":0.5},0],"enr":[{"nro":1},0],"nro":[{"rot":1},0],"rot":[{"oth":1},0],"gou":[{"our":1},0],"our":[{"uro":1},0],"uro":[{"roc":1},0],"roc":[0,{"ock":1}],"gra":[{"rac":0.5,"ran":0.5},0],"rac":[{"ace":1},0],"ceh":[{"ehi":1},0],"ehi":[{"hil":1},0],"ran":[{"ang":1},0],"nge":[{"gem":1},0],"gem":[{"emo":1},0],"emo":[{"mou":1},0],"gre":[{"ree":1},0],"ree":[{"een":1},0],"enh":[{"nhi":0.5,"nho":0.5},0],"eni":[{"nis":0.5,"nic":0.5},0],"nis":[{"isl":1},0],"isl":[{"sla":0.5,"sle":0.5},0],"eno":[{"noc":1},0],"hag":[{"agg":1},0],"agg":[0,{"ggs":1}],"lda":[{"dan":1},0],"dan":[0,{"ane":1}],"ane":[0,0],"ham":[{"ami":1},0],"ami":[{"mil":1},0],"mil":[{"ilt":0.3333333,"ilf":0.3333333,"iln":0.3333333},0],"ilt":[{"lto":1},0],"har":[{"ard":1},0],"rdg":[{"dga":1},0],"dga":[{"gat":1},0],"ver":[{"erf":0.25,"erg":0.25,"erk":0.25,"ern":0.25},0],"erf":[{"rfo":1},0],"rfo":[{"for":1},0],"for":[{"ord":1},{"ord":1}],"ord":[{"rdw":1},0],"rdw":[{"dwe":1},0],"dwe":[{"wes":1},0],"wes":[{"est":1},{"est":1}],"est":[{"sto":0.5,"stw":0.25,"stq":0.25},0],"lsb":[{"sbo":1},0],"sbo":[{"bor":1},0],"bor":[{"oro":1},0],"oro":[{"rou":1},0],"rou":[{"oug":1},0],"oug":[0,{"ugh":1}],"ugh":[0,0],"oly":[{"lyt":1},0],"lyt":[{"yto":1},0],"yto":[{"tow":1},0],"url":[{"rlf":1},0],"rlf":[{"lfo":1},0],"lfo":[{"for":1},0],"inv":[{"nve":1},0],"nve":[{"ver":1},0],"erg":[{"rgo":0.5,"rgl":0.5},0],"rgo":[{"gow":1},0],"owr":[{"wri":1},0],"wri":[0,{"rie":1}],"erk":[{"rke":1},0],"rke":[{"kei":1},0],"thi":[{"hin":0.5,"hil":0.5},{"hil":1}],"hin":[0,{"ing":1}],"rne":[{"nes":1},0],"nes":[0,{"ess":1}],"ess":[0,0],"irv":[{"rvi":1},0],"rvi":[{"vin":1},0],"vin":[{"ing":1},{"ine":1}],"joh":[{"ohn":1},0],"ohn":[{"hns":1},0],"hns":[{"nst":1},0],"nst":[{"sto":1},0],"ken":[{"enn":1},0],"now":[{"owa":1},0],"owa":[0,{"way":1}],"way":[0,0],"kil":[{"ilb":0.4,"ilm":0.2,"ilp":0.2,"ilw":0.2},0],"ilb":[{"lba":0.5,"lbr":0.5},0],"lba":[{"bar":1},0],"arc":[{"rch":1},0],"han":[0,0],"lbr":[{"bri":1},0],"ide":[0,0],"ilm":[{"lma":1},0],"lma":[{"mar":1},0],"mar":[{"arn":0.3333333,"ark":0.3333333,"ars":0.3333333},0],"arn":[{"rno":1},{"rne":0.5,"rns":0.5}],"rno":[{"noc":1},0],"ilp":[{"lpa":1},0],"lpa":[{"pat":1},0],"ilw":[{"lwi":1},0],"lwi":[{"win":1},0],"win":[{"inn":0.5,"ind":0.5},0],"inn":[{"nni":1},0],"nni":[{"nin":1},0],"nin":[0,{"ing":1}],"rkc":[{"kca":1},0],"kca":[{"cal":1},0],"ldy":[0,0],"rki":[{"kin":1},0],"nti":[{"til":1},0],"til":[{"ill":1},0],"rbe":[{"ber":1},0],"ert":[0,{"rth":1}],"rkh":[{"kha":1},0],"lau":[{"aur":1},0],"aur":[{"uri":1},0],"uri":[{"rie":1},0],"enz":[{"nzi":1},0],"nzi":[0,{"zie":1}],"zie":[0,0],"les":[{"esl":1},0],"esl":[{"sli":1},0],"lev":[{"eve":1},0],"eve":[{"ven":1},{"ven":1}],"inw":[{"nwo":1},0],"nwo":[{"woo":1},0],"woo":[0,{"ood":1}],"ood":[0,0],"lis":[{"isb":1},0],"isb":[{"sbu":1},0],"sbu":[{"bur":1},0],"liv":[{"ivi":1},0],"ivi":[{"vin":1},0],"ngs":[{"gst":1},0],"gst":[{"sto":1},0],"lon":[{"ong":1},0],"ong":[{"ngc":1},0],"ngc":[{"gcr":1},0],"gcr":[{"cro":1},0],"rof":[0,{"oft":1}],"oft":[0,0],"mad":[{"add":1},0],"add":[{"ddi":1},0],"dis":[{"ist":1},0],"ist":[{"sto":1},0],"inc":[0,{"nch":1}],"nch":[0,0],"rsh":[{"shf":1},0],"shf":[{"hfi":1},0],"hfi":[{"fie":1},0],"fie":[{"iel":0.6666667,"iet":0.3333333},0],"may":[{"ayf":1},0],"ayf":[{"yfi":1},0],"yfi":[{"fie":1},0],"mea":[{"ear":1},0],"rns":[0,0],"met":[{"eth":1},0],"ilf":[{"lfo":1},0],"iln":[{"lng":1},0],"lng":[{"nga":1},0],"nga":[{"gav":1},0],"gav":[{"avi":1},0],"avi":[0,{"vie":1}],"vie":[{"iew":1},0],"nif":[{"ifi":1},0],"ifi":[{"fie":1},0],"iet":[0,{"eth":1}],"onk":[{"nkt":1},0],"nkt":[{"kto":1},0],"kto":[0,{"ton":1}],"mot":[{"oth":1},0],"erw":[{"rwe":1},0],"mus":[{"uss":1},0],"uss":[{"sse":1},0],"sse":[{"sel":1},0],"sel":[{"elb":1},0],"elb":[{"lbu":1},0],"lbu":[{"bur":1},0],"net":[{"eth":1},0],"erl":[{"rle":1},0],"rle":[0,{"lee":1}],"lee":[0,0],"new":[{"ewa":0.125,"ewb":0.125,"ewc":0.125,"ewm":0.125,"ewp":0.125,"ewt":0.375},0],"ewa":[{"war":1},0],"war":[{"art":0.5,"arr":0.5},{"art":1}],"rth":[{"thi":0.5,"thc":0.5},0],"ewb":[{"wbo":1},0],"wbo":[{"bor":1},0],"ewc":[{"wca":1},0],"wca":[{"cas":1},0],"cas":[{"ast":1},0],"stl":[0,{"tle":1}],"tle":[0,0],"ewm":[{"wma":1},0],"wma":[{"mai":1},0],"mai":[{"ain":1},0],"ins":[0,0],"ewp":[{"wpo":0.5,"wpa":0.5},0],"wpo":[{"por":1},0],"por":[{"ort":1},{"ort":1}],"ort":[{"rta":0.25,"rth":0.25,"rtr":0.25,"rts":0.25},{"rth":1}],"ewt":[{"wto":1},0],"wto":[{"tow":1},{"ton":1}],"wna":[{"nar":1},0],"nar":[{"ard":1},0],"rds":[0,0],"pai":[{"ais":1},0],"ais":[{"isl":1},0],"sle":[0,{"ley":1}],"pen":[{"eni":1},0],"nic":[{"icu":1},0],"icu":[{"cui":1},0],"cui":[0,{"uik":1}],"uik":[0,0],"per":[{"ert":1},0],"pet":[{"ete":1},0],"ete":[{"ter":1},0],"ter":[{"erh":1},0],"erh":[{"rhe":1},0],"pol":[{"olm":1},0],"lmo":[{"mon":1},0],"ont":[{"nty":1},0],"pon":[{"ont":1},0],"typ":[{"ypo":1},0],"ypo":[{"poo":1},0],"poo":[0,{"ool":1}],"ool":[0,0],"rta":[{"tad":1},0],"tad":[{"ado":1},0],"ado":[{"dow":1},0],"thc":[{"hca":1},0],"hca":[{"caw":1},0],"caw":[0,{"awl":1}],"awl":[0,0],"rtr":[{"tru":1},0],"tru":[{"rus":1},0],"rus":[0,{"ush":1}],"ush":[0,0],"rts":[{"tst":1},0],"tst":[{"ste":1},0],"ste":[{"tew":0.25,"ten":0.25,"tep":0.25,"tev":0.25},0],"tew":[{"ewa":1},0],"pre":[{"res":1},0],"res":[{"est":1},0],"stw":[{"twi":1},0],"twi":[{"wic":1},0],"wic":[0,{"ick":1}],"red":[{"edd":0.6666667,"ede":0.3333333},0],"ngm":[{"gmu":1},0],"gmu":[{"mui":1},0],"mui":[{"uir":1},{"uir":1}],"uir":[{"irh":1},0],"irh":[{"rhe":1},0],"ren":[{"enf":0.5,"ent":0.25,"enp":0.25},0],"enf":[{"nfr":1},0],"nfr":[{"fre":1},0],"fre":[{"rew":1},{"rew":1}],"wsh":[{"shi":1},0],"hir":[0,{"ire":1}],"ire":[0,0],"ent":[{"nto":1},0],"osy":[{"syt":1},0],"syt":[0,{"yth":1}],"yth":[0,0],"rum":[{"umf":1},0],"mfo":[{"for":1},0],"rut":[{"uth":1},0],"rgl":[{"gle":1},0],"sal":[{"alt":1},0],"ltc":[{"tco":1},0],"tco":[{"coa":1},0],"ats":[0,0],"ten":[{"enh":1},0],"nho":[{"hou":1},0],"hou":[{"ous":1},0],"ous":[{"use":1},0],"use":[{"sem":1},0],"sem":[{"emu":1},0],"emu":[{"mui":1},0],"tep":[{"epp":1},0],"epp":[0,{"pps":1}],"pps":[0,0],"tev":[{"eve":1},0],"ens":[{"nst":1},0],"sti":[{"tir":1},0],"tir":[{"irl":1},0],"irl":[{"rli":1},0],"rli":[{"lin":1},0],"swa":[{"wan":1},0],"wan":[{"ans":1},0],"ans":[{"nse":1},0],"nse":[0,{"sea":1}],"sea":[0,0],"tal":[{"alb":1},0],"alb":[{"lbo":1},0],"lbo":[0,{"bot":1}],"tho":[{"hor":1},0],"rnl":[{"nli":1},0],"nli":[{"lie":1},0],"ieb":[{"eba":1},0],"rnt":[{"nto":1},0],"tre":[{"red":1},0],"ede":[{"deg":1},0],"deg":[{"ega":1},0],"ega":[0,{"gar":1}],"gar":[0,0],"udd":[{"ddi":1},0],"iew":[{"ewp":1},0],"wpa":[{"par":1},0],"par":[0,{"ark":1}],"wal":[{"all":1},0],"ces":[{"est":1},0],"rre":[{"ren":1},0],"enp":[{"npo":1},0],"npo":[{"poi":1},0],"poi":[{"oin":1},0],"oin":[0,{"int":1}],"stq":[{"tqu":1},0],"tqu":[{"qua":1},0],"qua":[{"uar":1},0],"uar":[{"art":1},0],"rte":[0,{"ter":1}],"ind":[{"ndy":1},0],"ndy":[{"dyg":1},0],"dyg":[{"yga":1},0],"yga":[{"gat":1},0],"wis":[{"ish":1},0],"sha":[0,{"haw":1}],"haw":[0,0]},"fe":{"abe":0.0110497,"air":0.0055249,"all":0.0110497,"and":0.0055249,"dre":0.0055249,"arb":0.0055249,"bro":0.0055249,"ard":0.0055249,"dro":0.0055249,"ros":0.0055249,"bal":0.0220994,"cla":0.0055249,"lar":0.0165746,"mon":0.0110497,"ban":0.0165746,"bri":0.0110497,"bar":0.0165746,"bat":0.0055249,"bea":0.0055249,"den":0.0110497,"bel":0.0110497,"hil":0.0055249,"bet":0.0055249,"bis":0.0055249,"bla":0.0110497,"ble":0.0055249,"bon":0.0165746,"bot":0.0055249,"bow":0.0055249,"lin":0.0055249,"bra":0.0055249,"buc":0.0055249,"hav":0.0110497,"bus":0.0055249,"cal":0.0055249,"der":0.0055249,"cam":0.0055249,"car":0.0276243,"cha":0.0055249,"hal":0.0055249,"chu":0.0055249,"hur":0.0055249,"cly":0.0055249,"coa":0.0110497,"col":0.0110497,"com":0.0055249,"coo":0.0055249,"cor":0.0055249,"cow":0.0055249,"cro":0.0110497,"hol":0.0055249,"cum":0.0055249,"dal":0.0055249,"dow":0.0055249,"dum":0.0110497,"dun":0.0220994,"edi":0.0055249,"egl":0.0055249,"eld":0.0055249,"ers":0.0055249,"elg":0.0055249,"fal":0.0055249,"kir":0.0110497,"fli":0.0055249,"gal":0.0055249,"gif":0.0055249,"gla":0.0055249,"gle":0.0055249,"len":0.0055249,"gou":0.0055249,"gra":0.0110497,"gre":0.0165746,"hag":0.0055249,"ham":0.0055249,"mil":0.0110497,"har":0.0055249,"wes":0.0055249,"inv":0.0165746,"irv":0.0055249,"joh":0.0055249,"ken":0.0055249,"kil":0.0276243,"mar":0.0110497,"win":0.0055249,"lau":0.0055249,"les":0.0055249,"lev":0.0055249,"lis":0.0055249,"liv":0.0055249,"lon":0.0055249,"mad":0.0055249,"may":0.0055249,"mea":0.0055249,"met":0.0055249,"vie":0.0055249,"mot":0.0055249,"mus":0.0055249,"net":0.0055249,"new":0.0441989,"war":0.0055249,"por":0.0276243,"pai":0.0055249,"pen":0.0055249,"per":0.0055249,"pet":0.0055249,"pol":0.0055249,"pon":0.0055249,"ste":0.0165746,"pre":0.0055249,"red":0.0110497,"ren":0.0165746,"rum":0.0055249,"rut":0.0055249,"sal":0.0055249,"sti":0.0055249,"swa":0.0055249,"tal":0.0055249,"tho":0.0110497,"tre":0.0055249,"udd":0.0055249,"wal":0.0055249,"wis":0.0055249}},"exclude":["aberdare","aberdeen","airdrie","allan","alloa","andrews","arbroath","ardrossan","balgonie","balloch","ballyclare","ballymoney","banbridge","banknock","bannockburn","bargeddie","barmouth","barrhead","bathgate","bearsden","belfast","bellshill","bethesda","bishopbriggs","blackburn","blantyre","bleary","bonhill","bonnybridge","bonnyrigg","bothwell","bowling","bradley","bridge","brightons","broxburn","buckhaven","busby","calder","cambuslang","cardiff","carfin","carluke","carron","carronshore","chapelhall","church","clarkston","clydebank","coaltown","coatbridge","coleraine","colwyn","comber","cookstown","corwen","cowbridge","crookedholm","crossgates","cumbernauld","dalkeith","denny","dennyloanhead","derry","downpatrick","dreghorn","dromore","dumbarton","dumfries","dundee","dunfermline","dunipace","duntocher","edinburgh","eglinton","elderslie","elgin","erskine","falkirk","flint","galashiels","giffnock","glasgow","glenrothes","gourock","gracehill","grangemouth","greenhill","greenisland","greenock","haggs","haldane","hamilton","hardgate","haven","haverfordwest","hillsborough","holytown","hurlford","invergowrie","inverkeithing","inverness","irvine","johnstone","kennoway","kilbarchan","kilbride","kilmarnock","kilpatrick","kilwinning","kirkcaldy","kirkintilloch","larbert","larkhall","larne","laurieston","lenzie","leslie","leven","linwood","lisburn","livingston","longcroft","maddiston","markinch","marshfield","mayfield","mearns","methil","milford","milngavie","monifieth","monkton","motherwell","musselburgh","netherlee","newarthill","newborough","newcastle","newmains","newport","newton","newtown","newtownards","paisley","penicuik","perth","peterhead","polmont","pontypool","portadown","porth","porthcawl","portrush","portstewart","prestwick","redding","reddingmuirhead","renfrew","renfrewshire","renton","rosyth","rumford","rutherglen","saltcoats","stenhousemuir","stepps","stevenston","stirling","swansea","talbot","thornliebank","thornton","tredegar","uddingston","viewpark","wallacestone","warrenpoint","westquarter","windygates","wishaw"]};

var samplingSize = 300;

//var wordGenerator = makeWordGenerator(model);
var sampler = new PoissonDiskSampling([samplingSize * 3, samplingSize * 3], 10, 22, 3);

// separate the world in 200 x 200 square
var worldGrid = {};
var worldRoads = {};
var worldNames = {};
var knownCells = {};

function sampleNames(referenceX, referenceY) {
    var referenceIndex = referenceX + ',' + referenceY;

    if (!worldNames.hasOwnProperty(referenceIndex)) {
        var points = worldGrid[referenceIndex];

        var names = [];

        for (var i = 0; i < points.length; i++) {
            names.push(wordGenerator(5 + (Math.random() * 4 | 0)).toUpperCase());
        }

        worldNames[referenceIndex] = names;
    }

    return worldNames[referenceIndex];
}

function sampleRoads(referenceX, referenceY) {
    // there won't be roads between cells, and that's alright for now

    var referenceIndex = referenceX + ',' + referenceY,
        zeroTile = referenceX === 0 && referenceY === 0;

    if (!worldRoads.hasOwnProperty(referenceIndex)) {
        var points = worldGrid[referenceIndex];

        var roads = [];

        for (var i = 0; i < points.length; i++) {
            for (var i2 = i + 1; i2 < points.length; i2++) {
                if (Math.abs(points[i][0] - points[i2][0]) + Math.abs(points[i][1] - points[i2][1]) < (18. + Math.sin(points[i][1] * 0.025 + points[i2][0] * 0.05) * 4.) / samplingSize) {
                    roads.push([points[i][0], points[i][1], points[i2][0], points[i2][1]]);
                }
            }

            if (zeroTile && Math.sqrt(Math.pow(points[i][0] - 0.5, 2) + Math.pow(points[i][1] - 0.5, 2)) < 0.05) {
                roads.push([points[i][0], points[i][1], 0.5, 0.5]);
            }
        }

        worldRoads[referenceIndex] = roads;
    }

    return worldRoads[referenceIndex];
}

function samplePoints(referenceX, referenceY) {
    var referenceIndex = referenceX + ',' + referenceY,
        x,
        y,
        index,
        i,
        points;

    sampler.reset();

    var missingCells = 0;

    for (x = -1; x < 2; x++) {
        for (y = -1; y < 2; y++) {
            index = (referenceX + x) + ',' + (referenceY + y);
            if (!worldGrid.hasOwnProperty(index)) {
                missingCells++;
            }
        }
    }

    if (missingCells > 0) {
        for (x = -1; x < 2; x++) {
            for (y = -1; y < 2; y++) {
                index = (referenceX + x) + ',' + (referenceY + y);

                if (!worldGrid.hasOwnProperty(index)) {
                    worldGrid[index] = [];
                    worldGrid[index].fixed = false;
                    knownCells[index] = false;
                } else {
                    points = worldGrid[index];
                    worldGrid[index].fixed = true;

                    for (i = 0; i < points.length; i++) {
                        sampler.addPoint([points[i][0] * samplingSize + (x + 1) * samplingSize, points[i][1] * samplingSize + (y + 1) * samplingSize]);
                    }

                    knownCells[index] = true;
                }
            }
        }

        points = sampler.fill();

        for (i = 0; i < points.length; i++) {
            var posX = referenceX + ((points[i][0] / samplingSize) | 0) - 1,
                posY = referenceY + ((points[i][1] / samplingSize) | 0) - 1,
                index = posX + ',' + posY;

            if (!knownCells[index]) {
                var x = (points[i][0] % samplingSize | 0) / samplingSize,
                    y = (points[i][1] % samplingSize | 0) / samplingSize;

                if (posX !== 0 || posY !== 0 || Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2)) > 0.045) {
                    worldGrid[index].push([x,y]);
                }
            }
        }
    }

    return worldGrid[referenceIndex];
}

function sampleWorld(referenceX, referenceY) {
    return {
        points: samplePoints(referenceX, referenceY),
        roads: null, //sampleRoads(referenceX, referenceY),
        names: null //sampleNames(referenceX, referenceY)
    };
}

module.exports = sampleWorld;
