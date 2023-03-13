import { IPokemon } from '../../models/models';

export interface IPokemonModal {
  color: string;
  setVisible: (isVisible: boolean) => void;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  pokemon: IPokemon;
  favorText: string;
}
