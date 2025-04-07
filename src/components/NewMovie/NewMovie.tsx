import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(1);

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const newMovie: Movie = { title, description, imdbId, imdbUrl, imgUrl };

  const isReady: boolean = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isReady) {
      return;
    }

    onAdd(newMovie);
    setCount((prev: number): number => prev + 1);
    if (count !== 0) {
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setDescription('');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={input => {
          setTitle(input);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={input => {
          setDescription(input);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={input => {
          setImgUrl(input);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={input => {
          setImdbUrl(input);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={input => {
          setImdbId(input);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isReady}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
