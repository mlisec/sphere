

	function getDistanceBetweenTwoVector(A, B) {
	// sqrt(Bx - Ax) + sqrt(By - Ay) + sqrt(Bz + Az)
	const x = B.x - A.x;
	const y = B.y - A.y;
	const z = B.z - A.z;
  return x ** 2 + y ** 2 + z ** 2
}

var Sphere = function(origin, radius) {
	this.origin = origin || new Vector3(0, 0, 0);
	this.radius = radius || 1;

	// todo - make sure origin and radius are replaced with default values if and only
	//        if they are invalid(i.e. origin & radius should be Vector3) or undefined
	//        default origin should be zero vector
	//        default radius should be 1

	this.checkIntersection = function (ray, sphere) {
		// Create a temp vector
		let tempVector = new Vector3();

		// tempVector = sphere origin - ray origin
		tempVector.subtract(sphere.origin);
		tempVector.subtract(ray.origin);

		// Check if we have intersection
    const length = tempVector.dot(ray.direction);

		// Sphere is behind the origin
		if (length < 0) {
			return null;
		}

		// Clone ray direction
		const cloneRayDir = ray.direction.clone();
		// Multiply the scalar
		cloneRayDir.multiplyScalar(length);
		// Add ray origin to ray direction
    cloneRayDir.add(ray.origin);
    // set the ray direction into temp vector
    tempVector.set(cloneRayDir.x, cloneRayDir.y, cloneRayDir.z);

    // Get sqrt distance between sphere origin and temp vector
		const distanceSquareRoot = getDistanceBetweenTwoVector(sphere.origin, tempVector);
		const radiusSquareRoot = sphere.radius ** 2;

		// Clone ray direction vector
		const cloneRayDirection = ray.direction.clone();
    cloneRayDirection.multiplyScalar(length - Math.sqrt(radiusSquareRoot - distanceSquareRoot));
    tempVector.set(cloneRayDirection.x, cloneRayDirection.y, cloneRayDirection.z);

    // Create new vector to store the intersection points
		// tempVector + Ray.Origin = Intersection
		const intersect = new Vector3().add(tempVector).add(ray.origin);
		const intersect2 = new Vector3().subtract(tempVector).subtract(ray.origin);
		return {
			point: intersect,
			distance: tempVector.z,
			normal: intersect.normalized(),
			hit: true
		}

  };

	this.raycast = function(ray) {
		// todo determine whether the ray intersects this sphere and where

		const intersection = this.checkIntersection(ray, this);

		if (intersection && intersection.distance > 0) {
			return intersection;
		}
		else {
			return {
				hit: false,
				point: null
			}
		}

	}
};
