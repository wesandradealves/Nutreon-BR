import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonPulse = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SkeletonImage = styled(SkeletonPulse)`
  width: 100%;
  height: 16rem;
`;

const SkeletonContent = styled.div`
  padding: 1rem;
`;

const SkeletonCategory = styled(SkeletonPulse)`
  height: 1rem;
  width: 40%;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

const SkeletonTitle = styled(SkeletonPulse)`
  height: 1.25rem;
  width: 80%;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
`;

const SkeletonPrice = styled(SkeletonPulse)`
  height: 1.5rem;
  width: 30%;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const SkeletonButton = styled(SkeletonPulse)`
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
`;

export function ProductCardSkeleton() {
  return (
    <SkeletonCard className="animate-pulse">
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonCategory />
        <SkeletonTitle />
        <SkeletonPrice />
        <SkeletonButton />
      </SkeletonContent>
    </SkeletonCard>
  );
}