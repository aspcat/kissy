/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 20 15:52
*/
KISSY.add("date/gregorian/const",function(){return{SUNDAY:0,MONDAY:1,TUESDAY:2,WEDNESDAY:3,THURSDAY:4,FRIDAY:5,SATURDAY:6,JANUARY:0,FEBRUARY:1,MARCH:2,APRIL:3,MAY:4,JUNE:5,JULY:6,AUGUST:7,SEPTEMBER:8,OCTOBER:9,NOVEMBER:10,DECEMBER:11}});
KISSY.add("date/gregorian/utils",function(g,B){var p=[0,31,59,90,120,151,181,212,243,273,304,334],A=[0,31,60,91,121,152,182,213,244,274,305,335],e={};g.mix(e,{isLeapYear:function(f){return 0!=(f&3)?!1:0!=f%100||0==f%400},mod:function(e,k){return e-k*f(e/k)},getFixedDate:function(e,k,h){var i=e-1;return 365*i+f(i/4)-f(i/100)+f(i/400)+(h+(w(e)?A[k]:p[k]))},getGregorianDateFromFixedDate:function(g){var k,h,i,j;h=g-1;k=f(h/146097);i=m(h,146097);h=f(i/36524);j=m(i,36524);i=f(j/1461);j=m(j,1461);j=f(j/
365);k=400*k+100*h+4*i+j;4==h||4==j||++k;i=e.getFixedDate(k,B.JANUARY,1);j=(h=w(k))?A:p;var u=g-i,s,n;for(n=0;n<j.length;n++)if(j[n]<=u)s=n;else break;i=g-i-j[s]+1;g=0<=g?g%7:m(g,7);return{year:k,month:s,dayOfMonth:i,dayOfWeek:g,isLeap:h}}});var f=Math.floor,w=e.isLeapYear,m=e.mod;return e},{requires:["./const"]});
KISSY.add("date/gregorian",function(g,B,p,A,e){function f(a,c){var d=g.makeArray(arguments);g.isObject(a)?(c=a,a=c.timezoneOffset):3<=d.length&&(a=c=null);this.locale=c=c||B;this.fields=[];this.time=e;this.timezoneOffset=a||c.timezoneOffset;this.firstDayOfWeek=c.firstDayOfWeek;this.minimalDaysInFirstWeek=c.minimalDaysInFirstWeek;this.fieldsComputed=!1;3<=arguments.length&&this.set.apply(this,d)}function w(a){var c=a.fields,d=m(c[h],c[i]);c[j]>d&&a.set(j,d)}function m(a,c){return x(a)?G[c]:H[c]}function C(a,
c,d){var l=c+6-q(c+6-a.firstDayOfWeek,7);l-c>=a.minimalDaysInFirstWeek&&(l-=7);return D((d-l)/7)+1}var k=parseInt;g.mix(f,A);g.mix(f,{isLeapYear:p.isLeapYear,YEAR:1,MONTH:2,DAY_OF_MONTH:3,HOUR_OF_DAY:4,MINUTES:5,SECONDS:6,MILLISECONDS:7,WEEK_OF_YEAR:8,WEEK_OF_MONTH:9,DAY_OF_YEAR:10,DAY_OF_WEEK:11,DAY_OF_WEEK_IN_MONTH:12,AM:0,PM:1});var h=f.YEAR,i=f.MONTH,j=f.DAY_OF_MONTH,u=f.HOUR_OF_DAY,s=f.MINUTES,n=f.SECONDS,y=f.MILLISECONDS,z=f.DAY_OF_WEEK_IN_MONTH,t=f.DAY_OF_YEAR,v=f.DAY_OF_WEEK,r=f.WEEK_OF_MONTH,
o=f.WEEK_OF_YEAR,H=[31,28,31,30,31,30,31,31,30,31,30,31],G=[31,29,31,30,31,30,31,31,30,31,30,31],q=p.mod,x=p.isLeapYear,D=Math.floor,E=[e,1,f.JANUARY,1,0,0,0,0,1,e,1,f.SUNDAY,1],F=[e,292278994,f.DECEMBER,e,23,59,59,999,e,e,e,f.SATURDAY,e];f.prototype={constructor:f,isLeapYear:function(){return x(this.getYear())},getLocale:function(){return this.locale},getActualMinimum:function(a){if(E[a]!==e)return E[a];var c=this.fields;if(a===r)return(new f(c[h],c[i],1)).get(r);throw Error("minimum value not defined!");
},getActualMaximum:function(a){if(F[a]!==e)return F[a];var c,d=this.fields;switch(a){case j:c=m(d[h],d[i]);break;case o:c=(new f(d[h],f.DECEMBER,31)).get(o);1==c&&(c=52);break;case r:c=(new f(d[h],d[i],m(d[h],d[i]))).get(r);break;case t:c=x(d[h])?366:365;break;case z:c=k((m(d[h],d[i])-1)/7)+1}if(c===e)throw Error("maximum value not defined!");return c},isSet:function(a){return this.fields[a]!==e},computeFields:function(){var a=this.time,c=6E4*this.timezoneOffset,d=k(c/864E5),c=c%864E5,d=d+k(a/864E5),
c=c+a%864E5;if(864E5<=c)c-=864E5,d++;else for(;0>c;)c+=864E5,d--;var d=d+719163,l=p.getGregorianDateFromFixedDate(d),b=l.year,a=this.fields;a[h]=b;a[i]=l.month;a[j]=l.dayOfMonth;a[v]=l.dayOfWeek;0!=c?(a[u]=k(c/36E5),c%=36E5,a[s]=k(c/6E4),c%=6E4,a[n]=k(c/1E3),a[y]=c%1E3):a[u]=a[s]=a[n]=a[y]=0;var e=p.getFixedDate(b,f.JANUARY,1),c=d-l.dayOfMonth+1;a[t]=d-e+1;a[z]=k((l.dayOfMonth-1)/7)+1;l=C(this,e,d);0==l?(l=e-1,b=e-(x(b-1)?366:365),l=C(this,b,l)):52<=l&&(b=e+(x(b)?366:365),e=b+6-q(b+6-this.firstDayOfWeek,
7),e-b>=this.minimalDaysInFirstWeek&&d>=e-7&&(l=1));a[o]=l;a[r]=C(this,c,d);this.fieldsComputed=!0},computeTime:function(){if(!this.isSet(h))throw Error("year must be set for KISSY GregorianCalendar");var a=this.fields,c=a[h],d=0;this.isSet(u)&&(d+=a[u]);d=60*d+(a[s]||0);d=60*d+(a[n]||0);d=1E3*d+(a[y]||0);a[h]=c;a=0+this.getFixedDate();this.time=d=864E5*(a-719163)+d-6E4*this.timezoneOffset;this.computeFields()},complete:function(){this.time===e&&this.computeTime();this.fieldsComputed||this.computeFields()},
getFixedDate:function(){var a=this.fields,c=this.firstDayOfWeek,d=a[h],b=f.JANUARY;this.isSet(i)&&(b=a[i],b>f.DECEMBER?(d+=k(b/12),b%=12):b<f.JANUARY&&(d+=D(b/12),b=q(b,12)));var e=p.getFixedDate(d,b,1),g=this.firstDayOfWeek;this.isSet(v)&&(g=a[v]);this.isSet(i)?this.isSet(j)?e+=a[j]-1:this.isSet(r)?(d=e+6-q(e+6-c,7),d-e>=this.minimalDaysInFirstWeek&&(d-=7),g!=c&&(d=d+6-q(d+6-g,7)),e=d+7*(a[r]-1)):(a=this.isSet(z)?a[z]:1,c=7*a,0>a&&(c=m(d,b)+7*(a+1)),e=e+c-1-q(e+c-1-g,7)):this.isSet(t)?e+=a[t]-1:
(d=e+6-q(e+6-c,7),d-e>=this.minimalDaysInFirstWeek&&(d-=7),g!=c&&(d=d+6-q(d+6-g,7)),e=d+7*(a[o]-1));return e},getTime:function(){this.time===e&&this.computeTime();return this.time},setTime:function(a){this.time=a;this.fieldsComputed=!1;this.complete()},get:function(a){this.complete();return this.fields[a]},set:function(a,c){var d=arguments.length;if(2==d)this.fields[a]=c;else if(d<y+1)for(var b=0;b<d;b++)this.fields[h+b]=arguments[b];else throw Error("illegal arguments for KISSY GregorianCalendar set");
this.time=e},add:function(a,c){if(c){var d=this.fields,b=this.get(a);if(a===h)this.set(h,b+c),w(this);else if(a===i){var b=b+c,e=D(b/12),b=q(b,12);e&&this.set(h,d[h]+e);this.set(i,b);w(this)}else{switch(a){case u:c*=36E5;break;case s:c*=6E4;break;case n:c*=1E3;break;case y:break;case r:case o:case z:c*=6048E5;break;case v:case t:case j:c*=864E5;break;default:throw Error("illegal field for add");}this.setTime(this.time+c)}}},getRolledValue:function(a,c,d,b){b=b-d+1;return d+(a-d+c%b+b)%b},roll:function(a,
c){if(c){var b=this.get(a),e=this.getActualMinimum(a),f=this.getActualMaximum(a),b=this.getRolledValue(b,c,e,f);this.set(a,b);switch(a){case i:w(this);break;default:this.updateFieldsBySet(a)}}},updateFieldsBySet:function(a){var c=this.fields;switch(a){case r:c[j]=e;break;case t:c[i]=e;break;case v:c[j]=e;break;case o:c[t]=e,c[i]=e}},getTimezoneOffset:function(){return this.timezoneOffset},setTimezoneOffset:function(a){this.timezoneOffset!=a&&(this.fieldsComputed=e,this.timezoneOffset=a)},setFirstDayOfWeek:function(a){this.firstDayOfWeek!=
a&&(this.firstDayOfWeek=a,this.fieldsComputed=!1)},getFirstDayOfWeek:function(){return this.firstDayOfWeek},setMinimalDaysInFirstWeek:function(a){this.minimalDaysInFirstWeek!=a&&(this.minimalDaysInFirstWeek=a,this.fieldsComputed=!1)},getMinimalDaysInFirstWeek:function(){return this.minimalDaysInFirstWeek},getWeeksInWeekYear:function(){var a=this.getWeekYear();if(a==this.get(h))return this.getActualMaximum(o);var c=this.clone();c.setWeekDate(a,2,this.get(v));return c.getActualMaximum(o)},getWeekYear:function(){var a=
this.get(h),c=this.get(o),b=this.get(i);b==f.JANUARY?52<=c&&--a:b==f.DECEMBER&&1==c&&++a;return a},setWeekDate:function(a,c,b){if(b<f.SUNDAY||b>f.SATURDAY)throw Error("invalid dayOfWeek: "+b);var e=this.fields,g=this.clone();g.clear();g.setTimezoneOffset(0);g.set(h,a);g.set(o,1);g.set(v,this.getFirstDayOfWeek());a=b-this.getFirstDayOfWeek();0>a&&(a+=7);a+=7*(c-1);0!=a?g.add(t,a):g.complete();e[h]=g.get(h);e[i]=g.get(i);e[j]=g.get(j);this.complete()},clone:function(){this.time===e&&this.computeTime();
var a=new f(this.timezoneOffset,this.locale);a.setTime(this.time);return a},equals:function(a){return this.getTime()==a.getTime()&&this.firstDayOfWeek==a.firstDayOfWeek&&this.timezoneOffset==a.timezoneOffset&&this.minimalDaysInFirstWeek==a.minimalDaysInFirstWeek},clear:function(a){a===e?this.field=[]:this.fields[a]=e;this.time=e;this.fieldsComputed=!1}};var b=f.prototype;b.getDayOfMonth=b.getHourOfDay=b.getWeekOfYear=b.getWeekOfMonth=b.getDayOfYear=b.getDayOfWeek=b.getDayOfWeekInMonth=g.noop;b.addDayOfMonth=
b.addMonth=b.addYear=b.addMinutes=b.addSeconds=b.addMilliSeconds=b.addHourOfDay=b.addWeekOfYear=b.addWeekOfMonth=b.addDayOfYear=b.addDayOfWeek=b.addDayOfWeekInMonth=g.noop;b.isSetDayOfMonth=b.isSetMonth=b.isSetYear=b.isSetMinutes=b.isSetSeconds=b.isSetMilliSeconds=b.isSetHourOfDay=b.isSetWeekOfYear=b.isSetWeekOfMonth=b.isSetDayOfYear=b.isSetDayOfWeek=b.isSetDayOfWeekInMonth=g.noop;b.setDayOfMonth=b.setHourOfDay=b.setWeekOfYear=b.setWeekOfMonth=b.setDayOfYear=b.setDayOfWeek=b.setDayOfWeekInMonth=g.noop;
b.rollDayOfMonth=b.rollMonth=b.rollYear=b.rollMinutes=b.rollSeconds=b.rollMilliSeconds=b.rollHourOfDay=b.rollWeekOfYear=b.rollWeekOfMonth=b.rollDayOfYear=b.rollDayOfWeek=b.rollDayOfWeekInMonth=g.noop;g.each(",Year,Month,DayOfMonth,HourOfDay,Minutes,Seconds,Milliseconds,WeekOfYear,WeekOfMonth,DayOfYear,DayOfWeek,DayOfWeekInMonth".split(","),function(a,c){if(a){b["get"+a]=function(){return this.get(c)};b["isSet"+a]=function(){return this.isSet(c)};b["set"+a]=function(a){return this.set(c,a)};b["add"+
a]=function(a){return this.add(c,a)};b["roll"+a]=function(a){return this.roll(c,a)}}});return f},{requires:["i18n!date","./gregorian/utils","./gregorian/const"]});