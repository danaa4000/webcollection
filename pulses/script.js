c = document.querySelector('#c')
c.width = 1920
c.height = 1080
x = c.getContext('2d')
C = Math.cos
S = Math.sin
t = 0
T = Math.tan

rsz=window.onresize=()=>{
  setTimeout(()=>{
    if(document.body.clientWidth > document.body.clientHeight*1.77777778){
      c.style.height = '100vh'
      setTimeout(()=>c.style.width = c.clientHeight*1.77777778+'px',0)
    }else{
      c.style.width = '100vw'
      setTimeout(()=>c.style.height =     c.clientWidth/1.77777778 + 'px',0)
    }
  },0)
}
rsz()

async function Draw(){
  
  if(!t){
    R=(Rl,Pt,Yw,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    Q=()=>[c.width/2+X/Z*400,c.height/2+Y/Z*400]
    I=(A,B,M,D,E,F,G,H)=>(K=((G-E)*(B-F)-(H-F)*(A-E))/(J=(H-F)*(M-A)-(G-E)*(D-B)))>=0&&K<=1&&(L=((M-A)*(B-F)-(D-B)*(A-E))/J)>=0&&L<=1?[A+K*(M-A),B+K*(D-B)]:0
    
    Rn = Math.random
    
    geoSphere = (mx, my, mz, iBc, size) => {
      let collapse=0
      let B=Array(iBc).fill().map(v=>{
        X = Rn()-.5
        Y = Rn()-.5
        Z = Rn()-.5
        return  [X,Y,Z]
      })
      for(let m=99;m--;){
        B.map((v,i)=>{
          X = v[0]
          Y = v[1]
          Z = v[2]
          B.map((q,j)=>{
            if(j!=i){
              X2=q[0]
              Y2=q[1]
              Z2=q[2]
              d=1+(Math.hypot(X-X2,Y-Y2,Z-Z2)*(3+iBc/40)*3)**4
              X+=(X-X2)*99/d
              Y+=(Y-Y2)*99/d
              Z+=(Z-Z2)*99/d
            }
          })
          d=Math.hypot(X,Y,Z)
          v[0]=X/d
          v[1]=Y/d
          v[2]=Z/d
          if(collapse){
            d=25+Math.hypot(X,Y,Z)
            v[0]=(X-X/d)/1.1
            v[1]=(Y-Y/d)/1.1         
            v[2]=(Z-Z/d)/1.1
          }
        })
      }
      B.map(v=>{
        v[0]*=size
        v[1]*=size
        v[2]*=size
        v[0]+=mx
        v[1]+=my
        v[2]+=mz
      })
      return [mx, my, mz, size, B]
    }

    Cylinder = (rw,cl,ls1,ls2) => {
      let a = []
      for(let i=rw;i--;){
        let b = []
        for(let j=cl;j--;){
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
        }
        //a = [...a, b]
        for(let j=cl;j--;){
          b = []
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)) * ls1
          Y = (1/rw*i-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*(j+1)) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          X = S(p=Math.PI*2/cl*j) * ls1
          Y = (1/rw*(i+1)-.5)*ls2
          Z = C(p) * ls1
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        }
      }
      b = []
      for(let j=cl;j--;){
        X = S(p=Math.PI*2/cl*j) * ls1
        Y = ls2/2
        Z = C(p) * ls1
        b = [...b, [X,Y,Z]]
      }
      //a = [...a, b]
      return a
    }

    Tetrahedron = size => {
      ret = []
      a = []
      let h = size/1.4142/1.25
      for(i=3;i--;){
        X = S(p=Math.PI*2/3*i) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
      }
      ret = [...ret, a]
      for(j=3;j--;){
        a = []
        X = 0
        Y = 0
        Z = -h
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/3*j) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/3*(j+1)) * size/1.25
        Y = C(p) * size/1.25
        Z = h
        a = [...a, [X,Y,Z]]
        ret = [...ret, a]
      }
      ax=ay=az=ct=0
      ret.map(v=>{
        v.map(q=>{
          ax+=q[0]
          ay+=q[1]
          az+=q[2]
          ct++
        })
      })
      ax/=ct
      ay/=ct
      az/=ct
      ret.map(v=>{
        v.map(q=>{
          q[0]-=ax
          q[1]-=ay
          q[2]-=az
        })
      })
      return ret
    }

    Cube = size => {
      for(CB=[],j=6;j--;CB=[...CB,b])for(b=[],i=4;i--;)b=[...b,[(a=[S(p=Math.PI*2/4*i+Math.PI/4),C(p),2**.5/2])[j%3]*(l=j<3?size/1.5:-size/1.5),a[(j+1)%3]*l,a[(j+2)%3]*l]]
      return CB
    }
    
    Octahedron = size => {
      ret = []
      let h = size/1.25
      for(j=8;j--;){
        a = []
        X = 0
        Y = 0
        Z = h * (j<4?-1:1)
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/4*j) * size/1.25
        Y = C(p) * size/1.25
        Z = 0
        a = [...a, [X,Y,Z]]
        X = S(p=Math.PI*2/4*(j+1)) * size/1.25
        Y = C(p) * size/1.25
        Z = 0
        a = [...a, [X,Y,Z]]
        ret = [...ret, a]
      }
      return ret      
    }
    
    Dodecahedron = size => {
      ret = []
      a = []
      mind = -6e6
      for(i=5;i--;){
        X=S(p=Math.PI*2/5*i + Math.PI/5)
        Y=C(p)
        Z=0
        if(Y>mind) mind=Y
        a = [...a, [X,Y,Z]]
      }
      a.map(v=>{
        X = v[0]
        Y = v[1]-=mind
        Z = v[2]
        R(0, .553573, 0)
        v[0] = X
        v[1] = Y
        v[2] = Z
      })
      b = JSON.parse(JSON.stringify(a))
      b.map(v=>{
        v[1] *= -1
      })
      ret = [...ret, a, b]
      mind = -6e6
      ret.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          if(Z>mind)mind = Z
        })
      })
      d1=Math.hypot(ret[0][0][0]-ret[0][1][0],ret[0][0][1]-ret[0][1][1],ret[0][0][2]-ret[0][1][2])
      ret.map(v=>{
        v.map(q=>{
          q[2]-=mind+d1/2
        })
      })
      b = JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          q[2]*=-1
        })
      })
      ret = [...ret, ...b]
      b = JSON.parse(JSON.stringify(ret))
      b.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI/2)
          R(0,Math.PI/2,0)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
      })
      e = JSON.parse(JSON.stringify(ret))
      e.map(v=>{
        v.map(q=>{
          X = q[0]
          Y = q[1]
          Z = q[2]
          R(0,0,Math.PI/2)
          R(Math.PI/2,0,0)
          q[0] = X
          q[1] = Y
          q[2] = Z
        })
      })
      ret = [...ret, ...b, ...e]
      ret.map(v=>{
        v.map(q=>{
          q[0] *= size/2
          q[1] *= size/2
          q[2] *= size/2
        })
      })
      return ret
    }
    
    Icosahedron = size => {
      ret = []
      B = [
        [[0,3],[1,0],[2,2]],
        [[0,3],[1,0],[1,3]],
        [[0,3],[2,3],[1,3]],
        [[0,2],[2,1],[1,0]],
        [[0,2],[1,3],[1,0]],
        [[0,2],[1,3],[2,0]],
        [[0,3],[2,2],[0,0]],
        [[1,0],[2,2],[2,1]],
        [[1,1],[2,2],[2,1]],
        [[1,1],[2,2],[0,0]],
        [[1,1],[2,1],[0,1]],
        [[0,2],[2,1],[0,1]],
        [[2,0],[1,2],[2,3]],
        [[0,0],[0,3],[2,3]],
        [[1,3],[2,0],[2,3]],
        [[2,3],[0,0],[1,2]],
        [[1,2],[2,0],[0,1]],
        [[0,0],[1,2],[1,1]],
        [[0,1],[1,2],[1,1]],
        [[0,2],[2,0],[0,1]],
      ]
      for(p=[1,1],i=38;i--;)p=[...p,p[l=p.length-1]+p[l-1]]
      phi = p[l]/p[l-1]
      a = [
        [-phi,-1,0],
        [phi,-1,0],
        [phi,1,0],
        [-phi,1,0],
      ]
      for(j=3;j--;ret=[...ret, b])for(b=[],i=4;i--;) b = [...b, [a[i][j],a[i][(j+1)%3],a[i][(j+2)%3]]]
      ret.map(v=>{
        v.map(q=>{
          q[0]*=size/2.25
          q[1]*=size/2.25
          q[2]*=size/2.25
        })
      })
      cp = JSON.parse(JSON.stringify(ret))
      out=[]
      a = []
      B.map(v=>{
        idx1a = v[0][0]
        idx2a = v[1][0]
        idx3a = v[2][0]
        idx1b = v[0][1]
        idx2b = v[1][1]
        idx3b = v[2][1]
        a = [...a, [cp[idx1a][idx1b],cp[idx2a][idx2b],cp[idx3a][idx3b]]]
      })
      out = [...out, ...a]
      return out
    }
    
    stroke = (scol, fcol, lwo=1) => {
      if(scol){
        x.closePath()
        x.globalAlpha = .2
        x.strokeStyle = scol
        x.lineWidth = Math.min(100,200*lwo/Z)
        x.stroke()
        x.lineWidth /= 4
        x.globalAlpha = 1
        x.stroke()
      }
      if(fcol){
        x.fillStyle = fcol
        x.fill()
      }
    }

    subDividedIcosahedron = (subs, size, sphereize = 0) => {
      let subIcos = Icosahedron(size)
      for(let m=subs; m--;){
        base = JSON.parse(JSON.stringify(subIcos))
        subIcos = []
        base.map(v=>{
          l = 0
          X1 = v[l][0]
          Y1 = v[l][1]
          Z1 = v[l][2]
          l = 1
          X2 = v[l][0]
          Y2 = v[l][1]
          Z2 = v[l][2]
          l = 2
          X3 = v[l][0]
          Y3 = v[l][1]
          Z3 = v[l][2]
          mx1 = (X1+X2)/2
          my1 = (Y1+Y2)/2
          mz1 = (Z1+Z2)/2
          mx2 = (X2+X3)/2
          my2 = (Y2+Y3)/2
          mz2 = (Z2+Z3)/2
          mx3 = (X3+X1)/2
          my3 = (Y3+Y1)/2
          mz3 = (Z3+Z1)/2
          a = []
          X = X1, Y = Y1, Z = Z1, a = [...a, [X,Y,Z]]
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = X2, Y = Y2, Z = Z2, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          X = X3, Y = Y3, Z = Z3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
          a = []
          X = mx1, Y = my1, Z = mz1, a = [...a, [X,Y,Z]]
          X = mx2, Y = my2, Z = mz2, a = [...a, [X,Y,Z]]
          X = mx3, Y = my3, Z = mz3, a = [...a, [X,Y,Z]]
          subIcos = [...subIcos, a]
        })
      }
      if(sphereize){
        ip1 = sphereize
        ip2 = 1-sphereize
        subIcos = subIcos.map(v=>{
          v = v.map(q=>{
            X = q[0]
            Y = q[1]
            Z = q[2]
            d = Math.hypot(X,Y,Z)
            X /= d
            Y /= d
            Z /= d
            X *= size*.75*ip1 + d*ip2
            Y *= size*.75*ip1 + d*ip2
            Z *= size*.75*ip1 + d*ip2
            return [X,Y,Z]
          })
          return v
        })
      }
      return subIcos
    }

    
    Rn = Math.random
    
    LsystemRecurse = (size, splits, p1, p2, stem, theta, LsystemReduction, twistFactor) => {
      if(size < .7) return
      let X1 = stem[0]
      let Y1 = stem[1]
      let Z1 = stem[2]
      let X2 = stem[3]
      let Y2 = stem[4]
      let Z2 = stem[5]
      let p1a = Math.atan2(X2-X1,Z2-Z1)
      let p2a = -Math.acos((Y2-Y1)/(Math.hypot(X2-X1,Y2-Y1,Z2-Z1)+.0001))+Math.PI
      size/=LsystemReduction
      for(let i=splits;i--;){
        X = 0
        Y = -size
        Z = 0
        R(0, theta, 0)
        R(0, 0, Math.PI*2/splits*i+twistFactor)
        R(0, p2a, 0)
        R(0, 0, p1a+twistFactor)
        X+=X2
        Y+=Y2
        Z+=Z2
        let newStem = [X2, Y2, Z2, X, Y, Z]
        Lshp = [...Lshp, newStem]
        LsystemRecurse(size, splits, p1+Math.PI*2/splits*i+twistFactor, p2+theta, newStem, theta, LsystemReduction, twistFactor)
      }
    }
    DrawLsystem = shp => {
      shp.map(v=>{
        x.beginPath()
        X = v[0]
        Y = v[1]
        Z = v[2]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        X = v[3]
        Y = v[4]
        Z = v[5]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        lwo = Math.hypot(v[0]-v[3],v[1]-v[4],v[2]-v[5])
        stroke('#0f82','',lwo)
      })
      
    }
    Lsystem = (size, splits, theta, LsystemReduction, twistFactor) => {
      Lshp = []
      stem = [0,0,0,0,-size,0]
      Lshp = [...Lshp, stem]
      LsystemRecurse(size, splits, 0, 0, stem, theta, LsystemReduction, twistFactor)
      Lshp.map(v=>{
        v[1]+=size*1.5
        v[4]+=size*1.5
      })
      return Lshp
    }
    
    Sphere = (ls, rw, cl) => {
      a = []
      ls/=1.25
      for(j = rw; j--;){
        for(i = cl; i--;){
          b = []
          X = S(p = Math.PI*2/cl*i) * S(q = Math.PI/rw*j) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*(i+1)) * S(q = Math.PI/rw*j) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*(i+1)) * S(q = Math.PI/rw*(j+1)) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          X = S(p = Math.PI*2/cl*i) * S(q = Math.PI/rw*(j+1)) * ls
          Y = C(q) * ls
          Z = C(p) * S(q) * ls
          b = [...b, [X,Y,Z]]
          a = [...a, b]
        }
      }
      return a
    }
    
    G = 12
    P = [], iPc = 100, pfreq = 160, iPv = 1.5
    spawnP = (tx, ty ,tz) => {
      for(let m = iPc;m--;){
        mv = .1+Rn()*.9
        X = tx// + (Rn()-.5)*G
        Y = ty //+ (Rn()-.5)*G
        Z = tz //+ (Rn()-.5)*G
        l=Rn()<.5?1:-1
        vx = -S(p1=Math.PI*2*Rn()) * S(p2=Math.PI/2*Rn()**.5) * iPv * mv
        vy = -C(p2) * iPv * mv * l * 2
        vz = -C(p1) * S(p2) * iPv * mv
        P = [...P, [X, Y, Z, vx, vy, vz, 1, []]]
      }
    }
    
    bounding = Cylinder(4,16,G/1.5,G*1.2)
    Bshp = Dodecahedron(2)
    iBc = 2, iBv = .45
    B = Array(iBc).fill().map(v=>{
      X = (Rn()-.5)*G
      Y = -G/2+G/2*Rn()
      Z = (Rn()-.5)*G
      vx = (Rn()-.5)*iBv
      vy = (Rn()-.5)*iBv
      vz = (Rn()-.5)*iBv
      return [X, Y, Z, vx, vy ,vz]
    })
    
    rw = 48*2
    cl = 16*2
    sp = 8
    grid = []
    Array(rw*cl).fill().map((v,i)=>{
      ls = sp/2
      tx = ((i%cl)-cl/2+.5)*sp*1.5 + ((i/cl|0)%2?sp*1.5/2:0)
      ty = G/2*1.2
      tz = (((i/cl|0)%rw)-rw/2+.5)*sp*0.8660254037844386/2
      d = Math.hypot(tx,tz)
      if(d<42.5*1.5){
        a = []
        for(j=6;j--;){
          X = tx + S(p=Math.PI*2/6*j+Math.PI/6)*ls
          Y = ty
          Z = tz + C(p)*ls
          a = [...a, [X,Y,Z]]
        }
        grid = [...grid, a]
      }
    })
    
    grav = .04
  }

  oX=0, oY=0, oZ=24//Math.max(20,Math.min(50,(.3+S(t/2)*100)))
  Rl = 0, Pt = -.3+S(t*2)/2, Yw = S(t/2)*6
  //Rl = 0, Pt = -Math.PI/2, Yw = 0
  
  x.globalAlpha = 1
  x.fillStyle='#000a'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'roud'
  
  grid.map(v=>{
    x.beginPath()
    v.map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      R(Rl,Pt,Yw,1)
      if(Z>0)x.lineTo(...Q())
    })
    stroke('#00ffcc08', '#4400ff08', 3)
  })
  
  bounding.map(v=>{
    x.beginPath()
    v.map(q=>{
      X = q[0]
      Y = q[1]
      Z = q[2]
      R(Rl,Pt,Yw,1)
      if(Z>0) x.lineTo(...Q())
    })
    stroke('#fff1','#40F1',.5)
  })

  B.map((v,i) => {
    tx = v[0] + v[3]
    ty = v[1] + v[4] + grav
    tz = v[2] + v[5]
    if(tx>G/2 || tx<-G/2) v[3] *=-1
    if(ty>G/2 || ty<-G/2) {v[4] *=-1, v[4]-=grav}
    if(tz>G/2 || tz<-G/2) v[5] *=-1
    tx = v[0] += v[3]
    ty = v[1] += v[4] += grav
    tz = v[2] += v[5]
    
    if(t&&!(((i*B.length/60+t*60)|0)%pfreq)) spawnP(tx, ty, tz)
    Bshp.map(q=>{
      x.beginPath()
      q.map(n=>{
        X = n[0] + tx
        Y = n[1] + ty
        Z = n[2] + tz
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
      })
      stroke('#f005', '#40f2', .5)
    })
  })
  
  P = P.filter(v=>v[6]>0)
  P.map(v=>{
    tx = v[0] + v[3]
    ty = v[1] + v[4] + grav
    tz = v[2] + v[5]
    d = Math.hypot(tx,tz)
    if(d<G/1.2 && ty>-G/1.5 && (tx>G/2 || tx<-G/2)) v[3] *=-1
    if(ty>G/2) {v[4] *=-1, v[4]-=grav}
    if(d<G/1.2 && ty>-G/1.5 && (tz>G/2 || tz<-G/2)) v[5] *=-1
    X = v[0] += v[3]
    Y = v[1] += v[4] += grav
    Z = v[2] += v[5]
    v[6] -= .01
    v[7]=[...v[7],[X,Y,Z]]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      x.globalAlpha = Math.max(0, v[6])
      l = Q()
      s = Math.min(1e3, 3000/Z)
      x.fillStyle = '#ff000006'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
      s/=2
      x.fillStyle = '#ff88020'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
      s/=2
      x.fillStyle = '#ff03'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
      s/=3
      x.fillStyle = '#fffd'
      x.fillRect(l[0]-s/2, l[1]-s/2, s, s)
    }
    v[7] = v[7].filter((q,j)=>j||v[7].length<20)
    v[7].map((q,j)=>{
      if(j){
        x.beginPath()
        l = j
        X = v[7][l][0]
        Y = v[7][l][1]
        Z = v[7][l][2]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        l = (j-1)
        X = v[7][l][0]
        Y = v[7][l][1]
        Z = v[7][l][2]
        R(Rl,Pt,Yw,1)
        if(Z>0)x.lineTo(...Q())
        if(1/v[7].length*j*v[6]>.15) stroke(`hsla(${360*1.5/v[7].length*j-t*100},99%,${30+80/v[7].length*j}%,${1/v[7].length*j*v[6]**2})`,'',v[6]*2)
      }
    })
  })
  
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()
