% init source matrix
source = zeros(1, 4, 4);
source(:, :, 1) = [0, 0, 0, 0];
source(:, :, 2) = [1, 2, 3, 4];
source(:, :, 3) = [2, 3, 4, 5];
source(:, :, 4) = [3, 4, 5, 6];

% get a random matrix
p = rand(4, 4);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% calculate kernel matrix of QDFRNT
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% matrix after one time QDFRNT
output = rqdfrnt(source, r, u);

% matrix restored from output matrix
reSource = rqdfrnt(output, ir, u);

% matrix after four time QDFRNT
output4 = rqdfrnt(output, r, u);
output4 = rqdfrnt(output4, r, u);
output4 = rqdfrnt(output4, r, u);