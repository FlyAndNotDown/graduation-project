% init source
source = zeros(3, 3, 3);
source(1, :, :) = [ [1, 2, 3], [2, 3, 4], [3, 4, 5] ];
source(2, :, :) = [ [2, 3, 4], [3, 4, 5], [4, 5, 6] ];
source(3, :, :) = [ [3, 4, 5], [4, 5, 6], [5, 6, 7] ];

% get grain mask
textureMaskValue = textureMask(source);