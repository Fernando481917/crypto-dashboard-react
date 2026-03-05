import { Canvas } from "@react-three/fiber";

function LiquidBackground(){

return(

<div className="liquid-bg">

<Canvas camera={{position:[0,0,5]}}>

<ambientLight intensity={0.6}/>

<mesh rotation={[0.5,0.5,0]}>
<sphereGeometry args={[3,64,64]} />
<meshStandardMaterial
color="#f97316"
wireframe
/>
</mesh>

</Canvas>

</div>

)

}

export default LiquidBackground;