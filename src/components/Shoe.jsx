import * as THREE from "three";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

function Shoe({ aiTexture }) {
  //Destructuring object given by useGLTF method
  //Be sure to use baked glb files to not face problems in rendering
  //Find the object in nodes which contains props - Geometry
  const { nodes } = useGLTF("./shoe.glb");
  //console.log(nodes);
  //mesh is used to render 3D objects - used inside the component "group"

  // Object3D: This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space.
  // Note that this can be used for grouping objects via the .add( object ) method which adds the object as a child, however it is better to use Group for this.

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.Object_2.geometry}
        material={new THREE.MeshStandardMaterial()}
        material-roughness={4}
        scale={[15, -15, -15]}
        rotation={[-0.5, 0, -0.05]}
      >
        {/**Decal enables us to render the texture which is passed as props upon the shoe */}
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 5, 0]}
          scale={-0.3}
          map={useTexture(aiTexture)}
        />
      </mesh>
    </group>
  );
}

export default Shoe;
