import { ChangeEvent, ComponentType, ReactNode } from "react";
import { InputValuesType } from "./InputValuesType"
import { MovieType } from "./MovieType";
import { ButtonProps } from "./ButtonTypes";
import { NewMovieTypes } from "./NewMovieTyps";

export type ChildrenPropsType = {
  children: ReactNode;
};

export type ProtectedRouteProps = {
  authenticationPath: string;
  children: JSX.Element
}

export type SignUpProps = {
  onRegistration: (inputValues: InputValuesType) => void;
  message: string;
  isLoading: boolean;
}

export type SignFormProps = {
  handleSubmit: (inputValues: InputValuesType) => void;
  nameForm: string;
  message: string;
  isLoading: boolean;
}

export type ProfileProps = {
  handleUserInfoChange: (userData: InputValuesType) => Promise<void>;
  isErrorRequest: boolean;
  isEditing: boolean;
  handleOpenConfirm: () => void;
  message: string;
  onSignOut: () => Promise<void>;
  isLoading: boolean;
}

export type ResourceLinkProps = {
  href: string;
  place: string;
  text: string;
}

export type NavLinkButtonProps = {
  text: string;
  place: string;
  type: string;
  color: string;
  link: string;
  isNotFoundPage?: boolean;
  onSignOut: () => Promise<void> | null;
}

export type FilterCheckboxProps = {
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean | null;
}

export type SavedMoviesCardListProps = {
  place?: string;
  moviesList: MovieType[] ;
  errorMessage: string;
  handleMovieDelete: (id: string) => void;
}

export type ButtonCrossProps = {
  handleClick: () => void;
  place?: string;
}

export type ProjectInfoProps = {
  title: string;
  subtitle: string;
}

export type HeaderMenuProps = {
  handleMenuOpen: () => void;
  isMenuOpen: boolean;
}

export type InputFormProps = {
  value: string | undefined;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  isError: string | undefined;
  errorMessage: string | undefined;
  autoComplete: string;
  labelName: string;
  inputType: string;
  typeWight: string;
  name: string;
}

export type SearchFormProps  = {
  handleSubmitMoviesSearch: (value: {
    keyword: string;
    shortmovies: boolean;
  }) => void;
  handleCheckboxShortmovies: (shortmovies: boolean) => void;
  valueCache?: boolean;
}

export type MoviesCardProps = {
  movie: MovieType;
  handleClick: () => void;
  Button: ComponentType<ButtonProps>;
  isOwner?: boolean;
  place?: string;
  handleMovieDelete?: (id: string) => void
}

export type MoviesCardListProps = {
  isLoading: boolean;
  place?: string;
  moviesList: MovieType[]
  savedMoviesList: MovieType[]
  handleMovieSave: (movieData: NewMovieTypes) => void;
  handleMovieDelete: (id: string) => void;
  errorMessage: string;
}

export type PortfolioLinkProps = {
  link: string;
  text: string;
}

export type AppendButtonProps = {
  onClick: () => void;
  text: string;
}

export type ButtonLikeProps = {
  isOwner?: boolean;
  handleClick?: () => void;
}

export type FormButtonProps = {
  text : string;
  isLoading: boolean;
  disabled: boolean;
}

export type NavigationLinkProps = {
  path: string;
  place: string;
  text: string;
}