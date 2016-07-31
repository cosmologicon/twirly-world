
// nsub = number of subdivisions
function isosphere(nsub) {
	var midpoints = {}
	var points = [
		[1, 0, 0], [0, 1, 0], [0, 0, 1],
		[-1, 0, 0], [0, -1, 0], [0, 0, -1],
	]
	function getmidpoint(A, B) {
		if (A > B) [A, B] = [B, A]
		if (!midpoints[[A, B]]) {
			midpoints[[A, B]] = points.length
			points.push(V.norm(V.plus(points[A], points[B])))
		}
		return midpoints[[A, B]]
	}
	var faces = [
		[0, 1, 2], [1, 3, 2], [3, 4, 2], [4, 0, 2],
		[1, 0, 5], [3, 1, 5], [4, 3, 5], [0, 4, 5],
	]
	for (var jsub = 0 ; jsub < nsub ; ++jsub) {
		var nfaces = []
		faces.forEach(function (face) {
			var [A, B, C] = face
			var D = getmidpoint(A, B)
			var E = getmidpoint(B, C)
			var F = getmidpoint(C, A)
			nfaces.push([A, D, F], [D, B, E], [D, E, F], [F, E, C])
		})
		faces = nfaces
	}
	return [points, faces]
}
