import { useReveal } from '../utils/helpers';

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
